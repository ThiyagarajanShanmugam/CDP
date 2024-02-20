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
      return res.status(400).json(err);
    });
};

module.exports.addBook = (req, res) => {
  const { bookName, bookAuthor, bookPrice } = req.body;
  try {
    Book.create({ bookName, bookAuthor, bookPrice })
      .then((result) => {
        return res.status(201).json(result._id);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports.getDueList = (req, res) => {
  try {
    Book.find({ currentUser: { $not: /campus/ } })
      .then((result) => {
        return res.status(201).json(result);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports.getDueStudentData = (req, res) => {
  const { id } = req.body;

  try {
    User.findOne({ _id: id })
      .then((result) => {
        return res.status(201).json(result);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  } catch (err) {
    return res.status(400).json(err);
  }
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

module.exports.removeDue = (req, res) => {
  const { bookID, userID } = req.body;
  try {
    Book.updateOne({ _id: bookID }, { currentUser: "campus" })
      .then((result) => {
        User.findOne({ _id: userID })
          .then((output) => {
            var index = output.currentBooks.indexOf(bookID);
            output.currentBooks.splice(index, 1);
            output.currentDues.splice(index, 1);

            console.log(index, output.currentBooks, output.currentDues);
            User.updateOne(
              { _id: userID },
              { currentBooks: output.currentBooks, currentDues: output.currentDues }
            )
              .then((result) => {
                return res.status(201).json(result);
              })
              .catch((err) => {
                return res.status(400).json(err);
              });
          })
          .catch((err) => {
            return res.status(400).json(err);
          });
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  } catch (err) {
    return res.status(400).json(err);
  }
};
