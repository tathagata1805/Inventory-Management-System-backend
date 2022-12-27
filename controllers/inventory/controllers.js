const inventoryModel = require("../../models/inventoryModel");

// ADD INVENTORY CONTROLLER
const addInventory = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const inventory = await inventoryModel.create({
      name,
      quantity,
    });
    res.status(200).json({ message: "New Inventory Created", inventory });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Couldn't create inventory", error: error.message });
  }
};

module.exports = {
  addInventory,
};
