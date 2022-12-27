const router = require("express").Router();
const {
  loginController,
  registerController,
  deleteUserController,
  logoutController,
  changePasswordController,
  getAllUsersController,
  // updateUserController,
} = require("../controllers/sales person/authControllers");

const protect = require("../middlewares/authMiddleware");

// ROUTES

// MTHOD -> POST / LOGIN USER
router.post("/login", loginController);

// METHOD -> POST / REGISTER USER
router.post("/register", registerController);

// METHOD -> DELETE / DELETE USER
router.delete("/delete/user/:id", deleteUserController);

// METHOD -> GET / LOGOUT USER
router.get("/logout", logoutController)

// METHOD -> PATCH / CHANGE PASSWORD
router.patch("/changepassword", protect, changePasswordController)

// METHOD -> GET / GET ALL USERS
router.get("/users/all", getAllUsersController);



module.exports = router;
