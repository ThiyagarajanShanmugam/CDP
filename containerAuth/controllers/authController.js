const User = require("../models/User");
const { handleUserError, createToken } = require("../util/errorHandler");

module.exports.getStudentData = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id, user.userType);
    res.cookie("auth_token", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ user: user._id, type: user.userType });
  } catch (err) {
    console.log(err);
    const errors = handleUserError(err);
    return res.status(400).json({ errors });
  }
};

module.exports.addUser = async (req, res) => {
  const { username, password, email, regno, phone, userType } = req.body;

  const data = {
    username: username,
    password: password,
    email: email,
    regno: regno,
    phone: phone,
    userType: userType,
  };

  try {
    const user = await User.create(data);
    const token = createToken(user._id, user.userType);
    res.cookie("auth_token", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleUserError(err);
    return res.status(400).json({ errors });
  }
};
