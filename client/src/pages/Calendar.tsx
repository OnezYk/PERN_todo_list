import {FaPlus} from "react-icons/fa";
import { useEffect, useState } from "react";

import {useGetTodos} from "../hooks/useGetTodos";
import { dateFormat } from "../utils/dateFormat";

import AOS from 'aos';
import 'aos/dist/aos.css';

import {Todo, type TodoType} from "../components/Todo";
import { CreateTodoTab } from "../components/CreateTodoTab";
import { deleteTodo } from "../utils/deleteTodo";
import dayjs from "dayjs";


export const Calendar = () => {

  //Hook com useEffect, executa quando importado e quando "getTodos" é chamado
  const {todos, erro, getTodos} = useGetTodos();
  
  const [addTabOpen, setAddTabOpen] = useState(false);
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());
  const [globalDelay, setGlobalDelay] = useState(false);

    useEffect(() => {
      
    setTimeout(() => {
      setGlobalDelay (true);
      console.log("a")
    }, 1000);

    AOS.init({
      once: true,
    });

    },);

  //É hoje?

  const concludedTodos = todos.filter(todo => todo.concluido);

  const handleComplete = async () => {

    setDeletingIds(new Set(concludedTodos.map(todo => todo.id)));
    await new Promise(res => setTimeout(res, 400)); // wait for animation

    await Promise.all(concludedTodos.map(todo => {

      deleteTodo(todo.id);
      
    }));

    setDeletingIds(new Set());
    return getTodos()
    
  }

  return (

    <div className={`w-screen h-screen overflow-hidden bg-[rgb(249,249,248)] text-stone-800`}>

      {addTabOpen && ( <CreateTodoTab onSubmit={getTodos} closeTab={() => { setAddTabOpen((p) => !p) }} /> )}

      <div className="pt-5 pl-9 pb-5 border-b border-stone-300">
        <h1 data-aos="fade-right" className="text-4xl font-bold">Calendário de tarefas</h1>
        <div className="flex gap-1">
          <p data-aos="fade-right" data-aos-delay="50" className="mt-2">{erro ? "Seu calendário está vazio, experimente " : `${concludedTodos.length} de ${todos.length} concluída${todos.length > 1 ? "s" : "" }`}</p>
          {erro ? <p data-aos="fade-right" data-aos-delay="50" onClick={() => setAddTabOpen(p => !p)} className="mt-2 underline hover:cursor-pointer">criar uma nova tarefa</p> : ""}
        </div>
      </div>

      <div className="flex flex-col gap-3 h-[calc(100%-113px)] p-9 overflow-y-scroll custom-scroll">

        {
        erro ? 
        <p>Você não tem tarefas para completar!</p>
        :
        <CalendarSection deletingIds={deletingIds} globalDelay={globalDelay}/>
        }

        <div className="flex gap-3 mt-8">

          <button onClick={handleComplete} data-aos="fade-in" data-aos-delay="200" data-aos-duration="800" className="btn-1 px-13 py-3 gap-2 font-medium">
            Completar
          </button>

          <button data-aos="fade-in" data-aos-delay="250" data-aos-duration="800" onClick={() => setAddTabOpen((p) => !p)} className="btn-2 px-5 py-3 gap-2 font-medium">

            <FaPlus /> 
            <p>Adicionar tarefa</p>

          </button>

        </div>

      </div>
      <div className="relative bottom-10 w-[calc(100%-10px)] h-10 bg-linear-to-b from-[rgba(249,249,249,0)] to-[rgba(249,249,248,1)] pointer-events-none"></div>
    </div>
  );
};

const CalendarSection = ({deletingIds, globalDelay} : {deletingIds:Set<number>, globalDelay:boolean}) => {
  const {todos, erro, getTodos} = useGetTodos();

  const grouped = todos.reduce<Record<string, typeof todos>>((acc, todo) => {
    const key = dayjs(todo.date).format("YYYY-MM-DD");
    if (!acc[key]) acc[key] = [];
    acc[key].push(todo);
    return acc;
  }, {});

  return (  // ← missing this
    <div>
      {Object.entries(grouped).map(([date, todos], index) => {
        const isExpired = dayjs().isAfter(date, 'day')

        return (
          <section key={date}>
            <h2 data-aos="fade-right" data-aos-delay={String(index * 50)} className="font-medium text-stone-500">{isExpired ? "Tarefas expiradas" : dayjs(date).format("DD/MM/YYYY")}</h2>
            {todos.map((todo, index) => (
              <Todo isDeleting={deletingIds.has(todo.id)} onCheck={getTodos} delay={globalDelay ? "50" : String((index + 1) * 100)} updateTodos={getTodos} key={todo.id} {...todo} />
            ))}
          </section>
        );
      })}
    </div>
  );
};