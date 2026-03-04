import { Dayjs } from "dayjs";
import { useState, useEffect, type SetStateAction, type ChangeEvent, type ChangeEventHandler } from "react";
import { postTodos } from "../utils/postTodos";

type TodoInfo = {

    name:string;
    description:string;
    tags:string[]
    date: Date | null

};

export function useCreateTodo() {

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null) // guardar info do relógio

  // Coleta info pro post ao server
  const [todoInfo, setTodoInfo] = useState<TodoInfo>({
    name: "",
    description: "",
    tags: [""],
    date: null
  }); 

  // Edição de tags de acordo com o index no array
  const handleTagChange = (index: number, value: string) => {
    setTodoInfo((todoObj : TodoInfo) => {
      const newTags = [...todoObj.tags];
      newTags[index] = value;
      return {...todoObj, tags: newTags};
    });
  }; 
  
  // Gera outro espaço e index no array quando clicado
  const handleAddTag = () => {
    setTodoInfo((todoObj : TodoInfo) => ({
      ...todoObj,
      tags: [...todoObj.tags, ""],
    }));
  }; 

  // Calls the utils/postTodo para fetch
  const handlePostTodo = () => {

    const {name, description, tags, date} = todoInfo;
    postTodos(name, description, tags, date);

  };

  // Auxilia funcoinamento date.js
  const handleChangeDate = (newDate: Dayjs | null)  => {

    setSelectedDate(newDate);
    setTodoInfo(todoObj => ({
    ...todoObj,
    date: newDate ? newDate.toDate() : null,

  }))};

  const handleAutoResize = (e: React.InputEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  // Coleta info da textbox NAME
  const handleNameChange = (e: ChangeEvent<HTMLTextAreaElement>) => {

   setTodoInfo((prev) => ({...prev, name: e.target.value}));
   
  }

  // Coleta info da textbox DESCRIPTION

  const handleDescChange = (e: ChangeEvent<HTMLTextAreaElement>) => {

   setTodoInfo((prev) => ({...prev, description: e.target.value}))

  };

  return {
      
      handleTagChange,
      handleAddTag,
      handleChangeDate,
      handlePostTodo,
      handleNameChange,
      handleDescChange,
      handleAutoResize,
      todoInfo,
      setTodoInfo,
      selectedDate


  }
} 