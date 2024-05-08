require("dotenv").config();
const express = require("express");

const indexRouter = require("./routes");

const app = express();
const PORT = Number(process.env.PORT);

app.use(express.json());

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
