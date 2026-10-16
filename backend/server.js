const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./Product");



const app = express();
const PORT = 3000;

app.use(express.json());
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.get("/", (req, res) => {
  res.send("SUBA AGRO Backend is running!");
});


app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Products fetch error:", error);
    res.status(500).json({
      message: "Failed to fetch products"
    });
  }
});


app.listen(PORT, () => {
  console.log(`SUBA AGRO backend running at http://localhost:${PORT}`);
});