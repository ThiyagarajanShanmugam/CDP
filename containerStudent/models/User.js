const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const { isEmail } = require("validator");

const user = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Enter the Username"],
    minlength: [3, "Username must be more than 3 characters"],
  },
  password: {
    type: String,
    required: [true, "Please Enter the Password"],
    minlength: [6, "Password must be more than 6 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter the Email Address"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid Email Address"],
  },
  regno: {
    type: String,
    required: [true, "Please Enter a register number"],
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, "Please Enter your Phone Number"],
    minlength: [10, "Please Enter a valid Mobile Number"],
  },
  currentBooks: {
    type: Array,
    default: [],
  },
  currentDues: {
    type: Array,
    default: [],
  },
  userType: {
    type: String,
    default: "student",
  },
});

// Hashing the Passwords before storing them in the DB
user.pre("save", async function (next) {
  const salt = await bcryptjs.genSalt();
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

// Static Method to Login Users
user.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcryptjs.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect Mail");
};

const User = mongoose.model("User", user);

module.exports = User;
