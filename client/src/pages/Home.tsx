import {FaPlus} from "react-icons/fa";
import { useState } from "react";

import {useGetTodos} from "../hooks/useGetTodos";

import {Todo} from "../components/Todo";
import { CreateTodoTab } from "../components/CreateTodoTab";


export const Home = () => {
  const {todos, loading, erro} = useGetTodos();
  const [open, setOpen] = useState(false);

  if (loading) console.log("fetching todos");
  if (todos) console.log(todos)

  return (
    <div
      className={`w-screen h-screen overflow-hidden bg-[rgb(249,249,248)] text-stone-800`}
    >
      {open && (
        <CreateTodoTab
          closeTab={() => {
            setOpen((p) => !p);
          }}
        />
      )}

      <div className="pt-5 pl-9 pb-5 border-b border-stone-300">
        <h1 className="text-4xl font-bold">Afazeres hoje</h1>
        <p className="mt-2">0 de 0 concluída</p>
      </div>

      <div className="flex flex-col gap-3 p-9">
        <Todo />
        <Todo />
        <Todo />

        <div className="flex gap-3 mt-8">
          <button className="btn-1 px-13 py-3 gap-2 font-medium">
            Completar
          </button>
          <button
            onClick={() => setOpen((p) => !p)}
            className="btn-2 px-5 py-3 gap-2 font-medium"
          >
            <FaPlus /> Adicionar tarefa
          </button>
        </div>
      </div>
    </div>
  );
};