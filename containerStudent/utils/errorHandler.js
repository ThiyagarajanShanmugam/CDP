module.exports.handleUserError = (err) => {
  let error = {
    email: "",
    password: "",
    username: "",
    regno: "",
    phone: "",
  };

  if (err.code === 11000) {
    error.email = "Email is Already Registered";
    return error;
  }

  if (err.message === "Incorrect Mail") {
    error.email = "Email is not registered";
  }

  if (err.message === "Incorrect Password") {
    error.password = "Password is invalid";
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }

  return error;
};