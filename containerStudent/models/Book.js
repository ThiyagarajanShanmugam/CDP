const mongoose = require("mongoose");

const book = new mongoose.Schema({
  bookName: {
    type: String,
    required: [true, "Please Enter a Book Name"],
  },
  bookAuthor: {
    type: String,
    required: [true, "Please Enter a Book Author"],
  },
  bookPrice: {
    type: Number,
    required: [true, "Please Enter the Book Price"],
  },
  currentUser: {
    type: String,
    default: "campus",
  },
});

const Book = mongoose.model("Book", book);

module.exports = Book;
