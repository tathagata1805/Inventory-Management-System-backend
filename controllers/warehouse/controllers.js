const warehouseModel = require("../../models/warehouseModel");

// ADD WAREHOUSE CONTROLLER
const addWarehouse = async (req, res) => {
  const { name, address, email } = req.body;
  try {
    const warehouse = await warehouseModel.create({
      name,
      address,
      email,
    });
    res.status(200).json({ message: "New Warehouse Created", warehouse });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Couldn't create warehouse", error: error.message });
  }
};

module.exports = {
  addWarehouse,
};
