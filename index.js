require("dotenv").config();
const express = require("express");
const ip = require("ip");

const indexRouter = require("./routes");
const userRouter = require("./routes");

const app = express();
const PORT = Number(process.env.PORT);

// I can parse request body as json
app.use(express.json());

// middleware (application level custom middleware)
app.use((req, res, next) => {
  req.body.country = ip.address;
  req.body.currency = "NPR";
  req.body.currentTime = new Date().toISOString();
  next();
});

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
