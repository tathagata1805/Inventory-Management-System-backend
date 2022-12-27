const customerModel = require("../../models/customerModel");
const salesPersonModel = require("../../models/salesPersonModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// GENERATE TOKEN
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT, { expiresIn: "1d" });
};

// USER REGISTER CONTROLLER
const registerController = asyncHandler(async (req, res) => {
  const { name, email, password, username } = req.body;

  // VALIDATION
  if (!name || !email || !password || !username) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be up to 6 characters");
  }

  // CHECK IF USER ALREADY EXISTS
  const userExists = await salesPersonModel.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email has already been registered");
  }

  // CREATE NEW USER
  const user = await salesPersonModel.create({
    name,
    email,
    username,
    password,
  });

  // GENERATE TOKEN
  const token = generateToken(user._id);

  // SEND HTTP-ONLY COOKIE
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });

  if (user) {
    const { _id, name, email, username } = user;
    res.status(201).json({
      message: "User Registered Successfully!",
      _id,
      name,
      email,
      username,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// USER LOGIN CONTROLLER
const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // VALIDATIONS
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add email and password");
  }

  // CHECK IF USER EXISTS
  const user = await salesPersonModel.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  }

  // USER EXISTS, VALIDATE PASSWORD
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  // GENERATE TOKEN
  const token = generateToken(user._id);

  // SEND HTTP-ONLY COOKIE
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });

  if (user && passwordIsCorrect) {
    const { _id, name, email, username } = user;
    res.status(200).json({
      message: "User Logged In Sucessfully!",
      _id,
      name,
      email,
      username,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// USER LOGOUT CONTROLLER
const logoutController = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "Successfully Logged Out" });
});


// CHANGE PASSWORD CONTROLLER
const changePasswordController = asyncHandler(async (req, res) => {
  const user = await salesPersonModel.findById(req.user._id);
  const { oldPassword, password } = req.body;

  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  }
  // VALIDATION
  if (!oldPassword || !password) {
    res.status(400);
    throw new Error("Please add old and new password");
  }

  // CHECK IF OLD PASSWORD MATCHES THE DB
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  // SAVE NEW PASSWORD
  if (user && passwordIsCorrect) {
    user.password = password;
    await user.save();
    res.status(200).send("Password change successful");
  } else {
    res.status(400);
    throw new Error("Old password is incorrect");
  }
});

// DELETE CUSTOMER CONTROLLER
const deleteUserController = async (req, res) => {
  try {
    await customerModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User has been deleted." });
  } catch (error) {
    res.status(400).json({
      message: "An error occured",
      error: error.message,
    });
  }
};


// GET ALL CUSTOMERS CONTROLLER
const getAllUsersController = async (req, res) => {
  await customerModel
    .find({})
    .then((users) => {
      const userFunction = users.map((user) => {
        const container = {};
        container.username = user.username;
        container.role = user.role;
        container.id = user._id;

        return container;
      });
      res.status(200).json({ user: userFunction });
    })
    .catch((err) =>
      res.status(401).json({ message: "Not successful", error: err.message })
    );
};


module.exports = {
  registerController,
  loginController,
  deleteUserController,
  getAllUsersController,
  logoutController,
  changePasswordController
};
