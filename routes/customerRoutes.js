const router = require("express").Router();
const {
  loginController,
  registerController,
  logoutController,
  changePasswordController,
} = require("../controllers/customers/authControllers");
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

module.exports = router;
