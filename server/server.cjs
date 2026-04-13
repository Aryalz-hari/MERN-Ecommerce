const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://aryalhari059:hari%402060@cluster0.edn2tbq.mongodb.net/?retryWrites=true&w=majority"
  )

  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const PORT = process.env.PORT || 8000;
app.use(
  cors({
    origin: process.env.CORS_ALLOWED_HOST || "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.listen(PORT, () => console.log("Server Running"));
