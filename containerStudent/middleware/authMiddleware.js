const jwt = require("jsonwebtoken");

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.auth_token;

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        return res
          .status(400)
          .json({ errors: { redirect: "login", msg: "Invalid Token" } });
      } else {
        if (decodedToken.type === "admin") {
          return res
            .status(400)
            .json({
              errors: {
                redirect: "login",
                msg: "Admin Not Allowed in Student Routes",
              },
            });
        }
        console.log(decodedToken);
        next();
      }
    });
  } else {
    return res
      .status(400)
      .json({ errors: { redirect: "login", msg: "Token Not Found" } });
  }
};

module.exports.checkUser = (req, res) => {
    const token = req.cookies.auth_token;
  
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.status(400).json({ errors: { redirect: "login", msg: "Invalid Token" } });
        } else {
          // console.log(decodedToken.type);
          if (decodedToken.type === "admin") {
            return res.status(400).json({ errors: { redirect: "login", msg: "Invalid Token" } });
          } else {
            return res.status(201).json({ msg: "valid" });
          }
        }
      });
    } else {
      return res.status(400).json({ errors: { redirect: "login", msg: "Invalid Token" } });
    }
  };
  