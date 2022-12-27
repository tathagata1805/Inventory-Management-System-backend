const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const managerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Can't be blank"],
    },
    username: {
      type: String,
      required: [true, "Can't be blank"],
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "Can't be blank"],
      index: true,
      validate: [isEmail, "Invalid Email"],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Can't be blank"],
    },
    contact: {
      type: String,
    },
    role: {
      type: String,
      default: "Manager",
      required: true,
    },
    verified: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

// HASHING USER PASSWORD
managerSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

const Managers = mongoose.model("Managers", managerSchema);
module.exports = Managers;
