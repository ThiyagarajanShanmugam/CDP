const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
app.use(cors({ origin: process.env.CORS_ACCESS, credentials: true }));
app.use(express.json());
app.use(cookieParser());

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

mongoose
  .connect(process.env.DB_URL)
  .then((result) => {
    app.listen(3000, () => {
      console.log("Server started in PORT: 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
