const axios = require("axios");

const khaltiClient = axios.create({
  baseURL: "https://a.khalti.com/api/v2",
  headers: {
    Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
});

module.exports = khaltiClient;
