import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [article, setArticle] = useState([]);
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [descUp, setUpdateDesc] = useState("");
  const [titleUp, setUpdateTitle] = useState("");
  const [currentEditId, setEditId] = useState("");

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

  const editTask = () => {
    console.log(currentEditId);
    axios.put(`http://localhost:3000/read/update/${currentEditId}`, {
      title: titleUp,
      desc: descUp,
    });
    setEditId("");
    fetchPosts();
    document.getElementById("my_modal_3").close();
  };

  function editOpener(id) {
    document.getElementById("my_modal_3").showModal();
    setEditId(id);
    console.log(id);
  }

  // this is for adding a task
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeDesc = (event) => {
    setDesc(event.target.value);
  };

  // this is for editing a task
  const handleUpdateTitle = (event) => {
    setUpdateTitle(event.target.value);
  };

  const handleUpdateDesc = (event) => {
    setUpdateDesc(event.target.value);
  };

  return (
    <main class="container mx-auto my-10">
      <input
        type="text"
        placeholder="Title"
        class="text-slate-900 input input-bordered w-full max-w-xs"
        value={title}
        onChange={handleChangeTitle}
      />
      <input
        type="text"
        placeholder="Desc"
        class="text-slate-900 ml-3 input input-bordered w-full max-w-xs"
        value={desc}
        onChange={handleChangeDesc}
      />
      <button class="ml-3 btn btn-outline btn-secondary" onClick={newTask}>
        New Task
      </button>
      {article.map((article) => (
        <div
          id={article.id}
          className="card rounded-md bg-slate-800 my-2 shadow"
        >
          <div className="card-title">{article.title}</div>
          <p>{article.desc}</p>
          <div class="flex gap-2">
            <button
              className="btn btn-outline btn-accent"
              onClick={() => editOpener(article.id)}
            >
              Edit
            </button>
            <button
              className="btn btn-outline btn-accent"
              onClick={() => deleteTask(article.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {/* <div
        id="my_modal_3"
        class="flex flex-col bg-slate-600/50 absolute inset-0 modal"
      >
        <div class="flex flex-col m-auto gap-y-5">
          <span class="">TIME TO EDIT</span>
          <input
            type="text"
            placeholder="Title"
            class="text-slate-900 input input-bordered input-primary w-full max-w-xs"
            value={title}
            onChange={handleChangeTitle}
          />
          <input
            type="text"
            placeholder="Description"
            class="text-slate-900 input input-bordered input-primary w-full max-w-xs"
            value={desc}
            onChange={handleChangeDesc}
          />
          <div>
            <button class="text-slate-50 btn glass w-1/2" onClick={closePanel}>
              Cancel
            </button>
            <button class="text-slate-50 btn glass w-1/2" onClick={editTask}>
              Edit
            </button>
          </div>
        </div>
      </div> */}
      <dialog id="my_modal_3" class="modal">
        <div class="modal-box">
          <form method="dialog">
            <button class="text-slate-900 btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div class="flex flex-col gap-y-3">
            <h3 class="text-slate-900 font-bold text-lg">TIME TO EDIT</h3>
            <input
              type="text"
              placeholder="Title"
              class="text-slate-900 input input-bordered input-primary w-full max-w-xs"
              value={titleUp}
              onChange={handleUpdateTitle}
            />
            <input
              type="text"
              placeholder="Description"
              class="text-slate-900 input input-bordered input-primary w-full max-w-xs"
              value={descUp}
              onChange={handleUpdateDesc}
            />
            <button class="text-slate-900 btn glass" onClick={editTask}>
              Edit
            </button>
          </div>
        </div>
      </dialog>
    </main>
  );
}
