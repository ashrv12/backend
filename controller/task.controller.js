const fs = require("fs");

const getTasks = async (req, res) => {
  const data = fs.readFileSync("articles.json", "utf8");

  res.json(JSON.parse(data));
};

const createTask = async (req, res) => {
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

  res.json([{ thewrite: "was successful" }]);
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, desc } = req.body;

  const data = fs.readFileSync("articles.json", "utf8");
  const list = JSON.parse(data);

  const index = list.findIndex((item) => item.id === Number(id));

  list[index].title = title;
  list[index].desc = desc;

  fs.writeFileSync("articles.json", JSON.stringify(list));

  res.json([{ writewas: "Successful" }]);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  const data = fs.readFileSync("articles.json", "utf8");
  const list = JSON.parse(data);

  const newList = list.filter((item) => item.id !== Number(id));

  fs.writeFileSync("articles.json", JSON.stringify(newList));
  res.json([{ status: "succ" }]);
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
