import {FaPlus} from "react-icons/fa";
import { useEffect, useState } from "react";

import {useGetTodos} from "../hooks/useGetTodos";

import {Todo} from "../components/Todo";
import { CreateTodoTab } from "../components/CreateTodoTab";
import { UUIDCheck } from "../hooks/UUIDCheck";


export const Home = () => {

  const {todos, erro, getTodos} = useGetTodos();
  const [open, setOpen] = useState(false)


  return (

    <div className={`w-screen h-screen overflow-hidden bg-[rgb(249,249,248)] text-stone-800`}>

      {open && ( <CreateTodoTab onSubmit={getTodos} closeTab={() => { setOpen((p) => !p) }} /> )}

      <div className="pt-5 pl-9 pb-5 border-b border-stone-300">
        <h1 className="text-4xl font-bold">Afazeres hoje</h1>
        <p className="mt-2">{todos.length == 0 ? "Sem tarefas por hoje" : `0 de ${todos.length} concluída`}</p>
      </div>

      <div className="flex flex-col gap-3 h-[calc(100%-113px)] p-9 overflow-y-scroll custom-scroll">

        {
        erro ? 
        <p>Sem afazeres hoje</p>
        :
        todos.map(todo => (<Todo key={todo.id} {...todo} />))
        }

        <div className="flex gap-3 mt-8">

          <button className="btn-1 px-13 py-3 gap-2 font-medium">
            Completar
          </button>

          <button onClick={() => setOpen((p) => !p)} className="btn-2 px-5 py-3 gap-2 font-medium">

            <FaPlus /> 
            <p>Adicionar tarefa</p>

          </button>

        </div>

      </div>
      <div className="relative bottom-10 w-[calc(100%-10px)] h-10 bg-linear-to-b from-[rgba(249,249,249,0)] to-[rgba(249,249,248,1)] pointer-events-none"></div>
    </div>
  );
};