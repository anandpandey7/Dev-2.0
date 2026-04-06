export default async function Home() {
  const response = await fetch("https://dummyjson.com/c/9d2f-aa94-499e-a055", {
    next: { revalidate:10 } 
  });
  const data = await response.json();
  console.log(data); // for verification

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-emerald-950">
        Todos Page
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.todos.map((todo: any) => (
          <div
            key={todo.id}
            className="bg-gray-900 rounded-2xl shadow-md p-6 hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-lime-400 mb-2">
              {todo.title}
            </h2>
            <p className="text-gray-600 text-sm">
              {todo.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

