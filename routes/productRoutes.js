const router = require("express").Router();
const { addProduct } = require("../controllers/product/controllers");

// ROUTES
// METHOD -> POST / ADD PRODUCT
router.post("/add", addProduct)



module.exports = router