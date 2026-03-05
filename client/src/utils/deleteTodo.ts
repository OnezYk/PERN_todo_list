export const deleteTodo = async ( id: number ) => {

  return await fetch("http://localhost:5000/todos", {
  method: "DELETE",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ "id": id }),
  })

  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));

}