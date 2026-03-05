import dayjs from "dayjs";

export const postTodo = async (
  name: string, 
  description: string, 
  tags: string[], 
  date: Date | null,
  time: Date | null): Promise<void> => {

  // Array de tags criava uma tag vazia no array pela UI
  const treatedTags = tags.filter((tag) => tag.length > 0);

  return await fetch("http://localhost:5000/todos", {
  method: "POST",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(
    {
  "name": name,
  "description": description,
  "tags": treatedTags,
  "date": date? dayjs(date)?.format("YYYY-MM-DD"): null,
  "time": time ? dayjs(time).format("HH:mm") : null,
  }
  ),
})

  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));

}