require("dotenv").config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middleware/errorHandler");

const PORT = process.env.PORT;

connectDB();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/products", productRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
