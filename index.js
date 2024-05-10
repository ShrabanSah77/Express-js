require("dotenv").config();
const express = require("express");

const indexRouter = require("./routes");
const userRouter = require("./routes");

const app = express();
const PORT = Number(process.env.PORT);

// I can parse request body as json
app.use(express.json());

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
