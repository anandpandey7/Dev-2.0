import { use, useState } from "react";

function TodoInput({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function submitHandler(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Title required");
    onAdd(title, description);
    setTitle("");
    setDescription("");
  }

  return (
    <form onSubmit={submitHandler}>
        <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Todo title"
        />
        <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description "
        ></textarea>
        <button type="submit">Add Todo</button>
    </form>
  );
}

export default TodoInput;


