const axios = require("axios");
require("dotenv").config();

const khalti = axios.create({
  baseURL: "https://a.khalti.com/api/v2",
  headers: {
    Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
});

module.exports = khalti;
