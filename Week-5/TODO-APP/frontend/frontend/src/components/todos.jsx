function TodoList({ todos, onDone, onDelete }) {
  return (
    <div className="todo-list">
      {todos.length === 0 && (
        <p className="text-center text-gray-600">No Todos Yet</p>
      )}

      {todos.map((todo) => (
    <div
      key={todo._id}
      className={`todo-item ${todo.completed ? "completed" : ""}`}
    >
      <div className="todo-title">{todo.title}</div>
      <div className="todo-desc">{todo.description}</div>

      <div className="actions">
        {!todo.completed && (
            <button
                className="btn-complete"
                onClick={() => onDone(todo._id)}
            >
                Mark Complete
            </button>
        )}

        <button
          className="btn-delete"
          onClick={() => onDelete(todo._id)}
        >
          Delete
        </button>
      </div>
    </div>
  ))}
    </div>
  );
}

export default TodoList;
