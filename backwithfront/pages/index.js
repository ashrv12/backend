import { useEffect, useState } from "react";

export default function Home() {
  const [article, setArticle] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/read")
      .then((res) => res.json())
      .then((data) => setArticle(data));
  }, []);

  return (
    <main class="container mx-auto">
      <button class="btn btn-outline btn-secondary">New Task</button>
      {article.map((article) => (
        <div
          id={article.id}
          className="card rounded-md bg-slate-200 my-2 shadow"
        >
          <div className="card-title">{article.title}</div>
          <p>{article.desc}</p>
          <div class="flex gap-2">
            <button className="btn btn-outline">Edit</button>
            <button className="btn btn-outline">Delete</button>
          </div>
        </div>
      ))}
    </main>
  );
}
