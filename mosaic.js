const express = require("express");
const fs = require("fs");
var cors = require("cors");
const taskRouter = require("./routes/task.router");
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.use("/read", taskRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
