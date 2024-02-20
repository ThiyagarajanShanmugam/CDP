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

const adminRoutes = require("./routes/adminRoutes");
app.get("/adminAuth", checkUser);
app.use("/admin", requireAuth, adminRoutes);

mongoose
  .connect(process.env.DB_URL)
  .then((result) => {
    app.listen(3002, () => {
      console.log("Server Started in Port: 3002");
    });
  })
  .catch((err) => {
    console.log(err);
  });
