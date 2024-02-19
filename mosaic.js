const express = require("express");
const app = express();
const port = 3000;

app.get("/asim", (req, res) => {
  const tiel = 999111100003333;
  res.json([
    {
      title: tiel,
      descriptic: "Zero Tolerancy",
    },
  ]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
