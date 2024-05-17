require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const indexRouter = require("./routes");

// .then and .catch use in promise

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database connected successfully..");
  })
  .catch((e) => {
    console.log("Database Error", e);
  });

const app = express();
const PORT = Number(process.env.PORT);

// I can parse request body as json
app.use(express.json());
app.use(morgan("dev"));
app.use("/assets", express.static("public"));

// http://localhost:8000/assets/uploads/12.jpg

// I am the routing mechanism, I will send the API request from / to user index
app.use("/", indexRouter);

// Error handling

app.use((err, req, res, next) => {
  const errorMsg = err ? err.toString() : "Something went wrong";
  res.status(500).json({ msg: errorMsg });
});

app.listen(PORT, () => {
  console.log("Application is running on port 8000");
});
