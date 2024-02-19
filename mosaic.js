const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.get("/read", (req, res) => {
  const data = fs.readFileSync("articles.json", "utf8");

  res.json(JSON.parse(data));
});

app.get("/read/create", (req, res) => {
  const { title, desc } = req.query;

  const data = fs.readFileSync("articles.json", "utf8");
  const list = JSON.parse(data);

  list.push({
    title: title,
    desc: desc,
  });

  fs.writeFileSync("articles.json", JSON.stringify(list));
  res.json([
    {
      thewrite: "was successful",
    },
  ]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
