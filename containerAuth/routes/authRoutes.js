const router = require("express").Router();
const {
  getStudentData,
  addUser,
} = require("../controllers/authController");

router.post("/getData", getStudentData);
router.post("/addUser", addUser);

module.exports = router;
