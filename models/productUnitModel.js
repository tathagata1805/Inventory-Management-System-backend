const mongoose = require("mongoose");

const productUnitSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    units: {
      type: String,
      required: true,
    },
    box: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ProductUnit = mongoose.model("ProductUnit", productUnitSchema);
module.exports = ProductUnit;
