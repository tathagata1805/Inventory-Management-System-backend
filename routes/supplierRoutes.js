const { addSupplier } = require("../controllers/supplier/controllers");

const router = require("express").Router();

// ROUTES
// METHOD -> POST / ADD SUPPLIER
router.post("/add", addSupplier);

module.exports = router;
