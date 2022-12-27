const supplierModel = require("../../models/supplierModel");

// ADD SUPPLIER CONTROLLER
const addSupplier = async (req, res) => {
  const { name, contact, address, email } = req.body;
  try {
    const supplier = await supplierModel.create({
      name,
      contact,
      address,
      email,
    });
    res.status(200).json({ message: "New Supplier Created", supplier });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Couldn't create supplier", error: error.message });
  }
};

module.exports = {
  addSupplier,
};
