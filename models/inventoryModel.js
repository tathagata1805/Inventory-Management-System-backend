const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema({
  name: {
    type: String,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: String,
    required: true,
  },
});

const Inventory = mongoose.model("Inventory", inventorySchema);
module.exports = Inventory;
