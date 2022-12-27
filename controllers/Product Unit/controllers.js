const productUnitModel = require("../../models/productUnitModel");

// ADD PRODUCT UNIT CONTROLLER
const addProductUnit = async (req, res) => {
  const { name, units, box, quantity } = req.body;
  try {
    const productUnit = await productUnitModel.create({
      name,
      units,
      box,
      quantity
    });
    res.status(200).json({ message: "New Product Unit Created", productUnit });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Couldn't create Product Unit", error: error.message });
  }
};

module.exports = {
  addProductUnit,
};
