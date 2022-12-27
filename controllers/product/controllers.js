const productModel = require("../../models/productModel");

// ADD PRODUCT CONTROLLER
const addProduct = async (req, res) => {
  const { name, photo, mrp, sp, expDate } = req.body;
  try {
    const product = await productModel.create({
      name,
      photo,
      mrp,
      sp,
      expDate,
    });
    res.status(200).json({ message: "New Product Created", product });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Couldn't create product", error: error.message });
  }
};

module.exports = {
  addProduct,
};
