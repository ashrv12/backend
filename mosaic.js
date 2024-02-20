const express = require("express");
const fs = require("fs");
var cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.post("/blast", (req, res) => {
  const body = req.body;

  console.log({ body });

  res.json([
    {
      status: "Success",
    },
  ]);
});

app.get("/read", (req, res) => {
  const data = fs.readFileSync("articles.json", "utf8");

  res.json(JSON.parse(data));
});

app.post("/read/create", (req, res) => {
  const { title, desc } = req.body;

  const data = fs.readFileSync("articles.json", "utf8");
  const list = JSON.parse(data);

  const articleId = list.length + 1;

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

app.put("/update/:id", (req, res) => {
  const id = req.params.id;

  console.log(id);

  const updateData = req.body;

  res.json([{ write: "Success" }]);
});

// app.get("/read/delete", (req, res) => {
//   const data = fs.readFileSync("articles.json", "utf8");
//   const list = JSON.parse(data);

//   list.pop();
//   res.json(
//     [
//       {
//         thewrite: "popped last",
//       },
//     ],
//     JSON.parse(data)
//   );
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
