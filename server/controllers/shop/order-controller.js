const khalti= require("../../helpers/khalti");
const Order = require("../../models/order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Products");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      cartId,
    } = req.body;

    const response = await khalti.post("/epayment/initiate/", {
      return_url: "http://localhost:5173/shop/khalti-return",
      website_url: "http://localhost:5173",
      amount: totalAmount * 100, // paisa
      purchase_order_id: `ORDER_${Date.now()}`,
      purchase_order_name: "Ecommerce Order",
    });

    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId: response.data.pidx,
    });

    await newlyCreatedOrder.save();

    res.status(201).json({
      success: true,
      approvalURL: response.data.payment_url,
      orderId: newlyCreatedOrder._id,
    });
  } catch (e) {
    console.log(e.response?.data || e);
    res.status(500).json({
      success: false,
      message: "Error while creating Khalti payment",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, orderId } = req.body;

    const verification = await khalti.post("/epayment/lookup/", {
      pidx: paymentId,
    });

    if (verification.data.status !== "Completed") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed",
      });
    }

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order can not be found",
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Not enough stock for this product`,
        });
      }

      product.totalStock -= item.quantity;
      await product.save();
    }

    await Cart.findByIdAndDelete(order.cartId);
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (e) {
    console.log(e.response?.data || e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};
