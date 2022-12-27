const router = require("express").Router();
const { addWarehouse } = require("../controllers/warehouse/controllers");

// ROUTES
// METHOD -> POST / ADD SUPPLIER
router.post("/add", addWarehouse);

module.exports = router;
