const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser")

//EXPRESS MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

// DB CONNECTION
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error : ${error.message}`);
    process.exit(1);
  }
};

// GETTING ROUTES..
app.use("/api/users", require("./routes/customerRoutes"));
app.use("/api/sales-person", require("./routes/salesPersonRoutes"));
app.use("/api/managers", require("./routes/managerRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/supplier", require("./routes/supplierRoutes"));
app.use("/api/warehouse", require("./routes/warehouseRoutes"));
app.use("/api/product", require("./routes/productUnitRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/inventory", require("./routes/inventoryRoutes"));

// APP INITIALIZATION...
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  connectDb();
  console.log(`Server listening on PORT: ${PORT}`);
});
