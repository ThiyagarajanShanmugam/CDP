const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ACCESS, credentials: true }));
app.use(cookieParser());

const { requireAuth, checkUser } = require("./middleware/authMiddleware");

app.get("/studentAuth", checkUser);
const studentRoutes = require("./routes/studentRoutes");
app.use("/student", requireAuth, studentRoutes);

mongoose
  .connect(process.env.DB_URL)
  .then((result) => {
    app.listen(3001, () => {
      console.log("Server Started in Port: 3001");
    });
  })
  .catch((err) => {
    console.log(err);
  });
