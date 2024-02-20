const router = require("express").Router();

const {
  getBooks,
  addBook,
  getDueList,
  getDueStudentData,
  removeDue,
  getSingleBook,
} = require("../controllers/adminControllers");

router.get("/getBooks", getBooks);
router.post("/addBook", addBook);
router.get("/getDueList", getDueList);
router.post("/getDueStudentData", getDueStudentData);
router.post("/removeDue", removeDue);
router.get("/getSingleBook", getSingleBook);

module.exports = router;
