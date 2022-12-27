const router = require("express").Router();
const { addInventory } = require("../controllers/inventory/controllers");

// ROUTES
// METHOD -> POST / ADD PRODUCT
router.post("/add", addInventory)



module.exports = router