export const postTodos = (
  name: string, 
  description: string, 
  tags: string[], 
  date: Date | null ): void => {

  fetch("http://localhost:5000/todos", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(
    {
  "name": name,
  "description": description,
  "tags": tags,
  "date": date?.toISOString().split('T')[0]
  }
  ),
})

  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));

}