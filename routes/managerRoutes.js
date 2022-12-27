const router = require("express").Router();
const { getInventoryController } = require("../controllers/admin/authControllers");
const {
  loginController,
  registerController,
  deleteUserController,
  getAllUsersController,
  getAllSuppliersController,
  logoutController,
  changePasswordController,
  deleteProductUnitController,
  deleteSupplierController,
  deleteWarehouseController,
  getAllProductUnitController,
  getAllWarehouseController,
  getAllProductsController,
  deleteProductsController,
  deleteInventoryController
} = require("../controllers/managers/authControllers");

const protect = require("../middlewares/authMiddleware");


// ROUTES

// MTHOD -> POST / LOGIN USER
router.post("/login", loginController);

// METHOD -> POST / REGISTER USER
router.post("/register", registerController);

// METHOD -> GET / LOGOUT USER
router.get("/logout", logoutController)

// METHOD -> PATCH / CHANGE PASSWORD
router.patch("/changepassword", protect, changePasswordController)

// METHOD -> DELETE / DELETE USER
router.delete("/delete/user/:id", deleteUserController);
router.delete("/delete/product/:id", deleteProductUnitController);
router.delete("/delete/suppliers/:id", deleteSupplierController);
router.delete("/delete/warehouse/:id", deleteWarehouseController);
router.delete("/delete/products/:id", deleteProductsController);
router.delete("/delete/inventory/:id", deleteInventoryController);

// METHOD -> GET / GET ALL USERS
router.get("/users/all", getAllUsersController);
router.get("/suppliers/all", getAllSuppliersController);
router.get("/product/all", getAllProductUnitController);
router.get("/warehouse/all", getAllWarehouseController);
router.get("/products/all", getAllProductsController);
router.get("/inventory/all", getInventoryController);


module.exports = router;
