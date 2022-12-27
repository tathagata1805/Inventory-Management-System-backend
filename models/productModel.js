const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    mrp: {
      type: String,
      required: true,
    },
    sp: {
      type: String,
      required: true,
    },
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    productUnitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductUnit",
    },
    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
    },
    expDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
