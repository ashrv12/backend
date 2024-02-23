const express = require("express");
const fs = require("fs");
var cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

// we reading this yessir
app.get("/read", (req, res) => {
  const data = fs.readFileSync("articles.json", "utf8");

  res.json(JSON.parse(data));
});

// we creating new shit yessirrr :,<
app.post("/read/create", (req, res) => {
  const { title, desc } = req.body;

  const data = fs.readFileSync("articles.json", "utf8");
  const list = JSON.parse(data);

  const articleId = Date.now();

  list.push({
    id: articleId,
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

// we updating it YESSIR (end me)
app.put("/read/update/:id", (req, res) => {
  const { id } = req.params;
  const { title, desc } = req.body;

  const data = fs.readFileSync("articles.json", "utf8");
  const list = JSON.parse(data);

  const index = list.findIndex((item) => item.id === Number(id));

  list[index].title = title;
  list[index].desc = desc;
  fs.writeFileSync("articles.json", JSON.stringify(list));

  res.json([{ write: "Success" }]);
});

// testing area
app.put("/test/:id", (req, res) => {
  const { id } = req.params.id;
  const { title, desc } = req.body;

  const data = fs.readFileSync("articles.json", "utf8");
  const list = JSON.parse(data);

  const index = list.findIndex((item) => item.id === Number(id));

  list[index].title = title;
  list[index].desc = desc;
  fs.writeFileSync("articles.json", JSON.stringify(list));

  res.json([{ write: "Success" }]);
});
// testing area

app.delete("/read/delete/:id", (req, res) => {
  const { id } = req.params;

  const data = fs.readFileSync("articles.json", "utf8");
  const list = JSON.parse(data);

  const newList = list.filter((item) => item.id !== Number(id));

  fs.writeFileSync("articles.json", JSON.stringify(newList));
  res.json([{ status: "succ" }]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
