import {FaPlus} from "react-icons/fa";
import { useEffect, useState } from "react";

import {useGetTodos} from "../hooks/useGetTodos";
import { dateFormat } from "../utils/dateFormat";

import AOS from 'aos';
import 'aos/dist/aos.css';

import {Todo, type TodoType} from "../components/Todo";
import { CreateTodoTab } from "../components/CreateTodoTab";


export const Home = () => {

  //Hook com useEffect, executa quando importado e quando "getTodos" é chamado
  const {todos, erro, getTodos} = useGetTodos();
  const [open, setOpen] = useState(false);

    useEffect(() => {
    AOS.init({
      once: true,
    });
    }, []);

  //É hoje?
  const todayTodos = todos.filter((todo) => dateFormat.isToday(todo.date))

  const concludedTodos = todos.filter(todo => todo.concluido).length

  return (

    <div className={`w-screen h-screen overflow-hidden bg-[rgb(249,249,248)] text-stone-800`}>

      {open && ( <CreateTodoTab onSubmit={getTodos} closeTab={() => { setOpen((p) => !p) }} /> )}

      <div className="pt-5 pl-9 pb-5 border-b border-stone-300">
        <h1 data-aos="fade-right" className="text-4xl font-bold">Tarefas hoje</h1>
        <p data-aos="fade-right" data-aos-delay="50" className="mt-2">{erro ? "Sem tarefas por hoje" : `${concludedTodos} de ${todos.length} concluída`}</p>
      </div>

      <div className="flex flex-col gap-3 h-[calc(100%-113px)] p-9 overflow-y-scroll custom-scroll">

        {
        erro ? 
        <p>Sem afazeres hoje</p>
        :
        
        todayTodos.map((todo, index) => (<Todo onCheck={getTodos} delay={String((index + 1) * 100)} updateTodos={getTodos} key={todo.id} {...todo} />))
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