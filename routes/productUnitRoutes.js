const router = require("express").Router();
const { addProductUnit } = require("../controllers/Product Unit/controllers");

// ROUTES
// METHOD -> POST / ADD PRODUCT UNIT

router.post("/add", addProductUnit)

module.exports = router