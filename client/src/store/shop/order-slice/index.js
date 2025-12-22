import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
  paymentURL: null,
};
const url = import.meta.env.VITE_API_URL || "http://143.244.128.203:8000";
export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData) => {
    const response = await axios.post(
      url + "/api/shop/order/create",
      orderData
    );

    return response.data;
  }
);

//khalti
export const verifyKhaltiPayment = createAsyncThunk(
  "/order/verifyKhaltiPayment",
  async ({ pidx, orderId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(url + "/api/shop/order/khalti/verify", {
        pidx,
        orderId,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Khalti payment verification failed"
      );
    }
  }
);

//paypal
export const capturePayment = createAsyncThunk(
  "/order/capturePayment",
  async ({ paymentId, payerId, orderId }) => {
    const response = await axios.post(url + "/api/shop/order/paypal/capture", {
      paymentId,
      payerId,
      orderId,
    });

    return response.data;
  }
);
export const getAllOrdersByUserId = createAsyncThunk(
  "/order/getAllOrdersByUserId",
  async (userId) => {
    const response = await axios.get(url + `/api/shop/order/list/${userId}`);

    return response.data;
  }
);

export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (id) => {
    const response = await axios.get(url + `/api/shop/order/details/${id}`);

    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.paymentURL = action.payload.paymentURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.paymentURL = null;
        state.orderId = null;
      })
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      })
      .addCase(verifyKhaltiPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyKhaltiPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.data;
        state.success = true;
      })
      .addCase(verifyKhaltiPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrderDetails } = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;
