const { sql } = require("../backupmosaic");

const getTasks = async (req, res) => {
  const result = await sql`select * from tasks`;

  res.json(result);
};

const createTask = async (req, res) => {
  const { title, desc } = req.body;
  await sql`insert into tasks(id,title,description) values(${Date.now()},${title},${desc})`;

  res.json([{ thewrite: "was successful" }]);
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, desc } = req.body;

  await sql``;

  res.json([{ writewas: "Successful" }]);
};

// const deleteTask = async (req, res) => {
//   const { id } = req.params;

//   const data = fs.readFileSync("articles.json", "utf8");
//   const list = JSON.parse(data);

//   const newList = list.filter((item) => item.id !== Number(id));

//   fs.writeFileSync("articles.json", JSON.stringify(newList));
//   res.json([{ status: "succ" }]);
// };

module.exports = {
  getTasks,
  createTask,
  // updateTask,
  // deleteTask,
};
