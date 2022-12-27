const mongoose = require("mongoose");
const { isEmail } = require("validator");

const warehouseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email can't be blank"],
      validate: [isEmail, "Invalid Email"],
    },
  },
  { timestamps: true }
);

const Warehouse = mongoose.model("Warehouse", warehouseSchema);
module.exports = Warehouse;
