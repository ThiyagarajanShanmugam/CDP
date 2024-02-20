const Book = require("../models/Book");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const current = new Date();

module.exports.getBooks = (req, res) => {
  Book.find({})
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((err) => {
      return res.status(400).json({ errors: "Not Found" });
    });
};

module.exports.getProfile = (req, res) => {
  const token = req.cookies.auth_token;

  const decodedToken = jwt.decode(token);
  User.findById({ _id: decodedToken.id })
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((err) => {
      return res.status(400).json({ err });
    });
};

module.exports.bookData = (req, res) => {
  const { bookID } = req.body;
  const token = req.cookies.auth_token;
  const user = jwt.decode(token).id;
  Book.updateOne({ _id: bookID }, { currentUser: user })
    .then((result) => {
      User.updateOne(
        { _id: user },
        {
          $push: {
            currentBooks: bookID,
            currentDues: current.getDate() + ":" + (current.getMonth() + 1),
          },
        }
      )
        .then((output) => {
          return res.status(201).json(output);
        })
        .catch((err) => {
          return res.status(400).json(err);
        });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

module.exports.getSingleBook = (req, res) => {
  const { bookname } = req.body;

  Book.findOne({ bookName: bookname })
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

module.exports.getDues = (req, res) => {
  const token = req.cookies.auth_token;
  const id = jwt.decode(token).id;

  User.findById({ _id: id })
    .then((result) => {
        Book.find({"_id": result.currentBooks}).then((output) => {
            return res.status(201).json(output);
        }).catch(err => {
            return res.status(400).json(err);
        });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};
