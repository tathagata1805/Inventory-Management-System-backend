const mongoose = require("mongoose");
const { isEmail } = require("validator");

const supplierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contact: {
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

const Supplier = mongoose.model("Supplier", supplierSchema);
module.exports = Supplier;
