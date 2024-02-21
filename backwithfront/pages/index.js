import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [article, setArticle] = useState([]);
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    // fetch("http://localhost:3000/read")
    //   .then((res) => res.json())
    //   .then((data) => setArticle(data));
    axios.get("http://localhost:3000/read").then((response) => {
      setArticle(response.data);
    });
  };

  const newTask = async () => {
    try {
      await axios.post("http://localhost:3000/read/create", {
        title,
        desc,
      });
      setTitle("");
      setDesc("");
      fetchPosts();
    } catch (error) {
      console.error("Error:", error);
      alert("An error error error");
    }
    // fetch("http://localhost:3000/read/create", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ title, desc }),
    // })
    //   .then((res) => res.json())
    //   .then(() => {
    //     setTitle("");
    //     setDesc("");
    //     fetchPosts();
    //   });
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:3000/read/delete/${id}`).then(() => {
      fetchPosts();
    });
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeDesc = (event) => {
    setDesc(event.target.value);
  };

  return (
    <main class="container mx-auto my-10">
      <input
        type="text"
        placeholder="Title"
        class="input input-bordered w-full max-w-xs"
        value={title}
        onChange={handleChangeTitle}
      />
      <input
        type="text"
        placeholder="Desc"
        class="ml-3 input input-bordered w-full max-w-xs"
        value={desc}
        onChange={handleChangeDesc}
      />
      <button class="ml-3 btn btn-outline btn-secondary" onClick={newTask}>
        New Task
      </button>
      {article.map((article) => (
        <div
          id={article.id}
          className="card rounded-md bg-slate-200 my-2 shadow"
        >
          <div className="card-title">{article.title}</div>
          <p>{article.desc}</p>
          <div class="flex gap-2">
            <button className="btn btn-outline">Edit</button>
            <button
              className="btn btn-outline"
              onClick={() => deleteTask(article.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}
