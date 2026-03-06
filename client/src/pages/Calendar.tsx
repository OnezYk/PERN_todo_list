import {FaPlus} from "react-icons/fa";
import { useState } from "react";

import {useGetTodos} from "../hooks/useGetTodos";

import 'aos/dist/aos.css';

import {Todo} from "../components/Todo";
import { CreateTodoTab } from "../components/CreateTodoTab";


export const Calendar = () => {

  //Hook com useEffect, executa quando importado e quando "getTodos" é chamado
  const {todos, erro, getTodos} = useGetTodos();
  const [open, setOpen] = useState(false)

  return (

    <div className={`w-screen h-screen overflow-hidden bg-[rgb(249,249,248)] text-stone-800`}>

      {open && ( <CreateTodoTab onSubmit={getTodos} closeTab={() => { setOpen((p) => !p) }} /> )}

      <div className="pt-5 pl-9 pb-5 border-b border-stone-300">
        <h1 data-aos="fade-right" className="text-4xl font-bold">Calendário</h1>
        <p data-aos="fade-right" data-aos-delay="50" className="mt-2">{erro ? "Sem tarefas por hoje" : `0 de ${todos.length} concluída`}</p>
      </div>

      <div className="flex flex-col gap-3 h-[calc(100%-113px)] p-9 overflow-y-scroll custom-scroll">

        {
        erro ? 
        <p>Sem afazeres hoje</p>
        :
        
        todos.map((todo, index) => (<Todo delay={String((index + 1) * 100)} updateTodo={getTodos} key={todo.id} {...todo} />))
        }

        <div className="flex gap-3 mt-8">

          <button data-aos="fade-in" data-aos-delay="200" data-aos-duration="800" className="btn-1 px-13 py-3 gap-2 font-medium">
            Completar
          </button>

          <button data-aos="fade-in" data-aos-delay="250" data-aos-duration="800" onClick={() => setOpen((p) => !p)} className="btn-2 px-5 py-3 gap-2 font-medium">

            <FaPlus /> 
            <p>Adicionar tarefa</p>

          </button>

        </div>

      </div>
      <div className="relative bottom-10 w-[calc(100%-10px)] h-10 bg-linear-to-b from-[rgba(249,249,249,0)] to-[rgba(249,249,248,1)] pointer-events-none"></div>
    </div>
  );
};