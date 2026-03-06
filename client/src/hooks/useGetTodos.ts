import { useState, useEffect } from "react";

type Todo = {
  id: number;
  name: string;
  description: string;
  tags: string[];
  date: Date;
  time: Date;
  concluido: boolean;
  erro?: string
}

export const useGetTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  // CONSOLE.LOG em cada getTodo()
  const fetchTodos = () => 
    fetch("http://localhost:5000/todos", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        if (data.erro) {
          setErro(data.erro);
        } else {
          setTodos(data);
          console.log(data)
        }
      })
      .catch(err => setErro(err))
      .finally(() => setLoading(false));

  useEffect(() => {

    fetchTodos();
    
  }, []);

  const getTodos = () => {

    setErro(null);
    fetchTodos();

  }

  return { todos, loading, erro, getTodos};
};