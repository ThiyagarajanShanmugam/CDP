const router = require("express").Router();

const { getBooks, getProfile, bookData, getSingleBook, getDues } = require("../controllers/studentControllers");

router.get("/getBooks", getBooks);
router.get("/getProfile", getProfile);
router.post("/bookData", bookData);
router.post("/getSingleBook", getSingleBook);
router.get("/getDues", getDues);

module.exports = router;
