import { useState, useEffect } from "react";

export const useGetTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then(res => res.json())
      .then(data => {setTodos(data)})
      .catch(err => setErro(err))
      .finally(() => setLoading(false));
  }, []);

  return { todos, loading, erro };
};