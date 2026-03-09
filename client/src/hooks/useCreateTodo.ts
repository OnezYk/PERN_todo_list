import dayjs, { Dayjs } from "dayjs";
import { TimePicker, type TimePickerProps } from "@mui/x-date-pickers";
import { useState, type ChangeEvent } from "react";
import { postTodo } from "../utils/postTodo";

type TodoInfo = {

    name:string,
    description:string,
    tags:string[],
    date: Date | null,
    time: Date | null

};

export function useCreateTodo() {

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs().startOf('day'))
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(dayjs().startOf('day'))
  const [nameCharLimited, setNameCharLimited] = useState<string | number>("")
  const [descCharLimited, setDescCharLimited] = useState<string | number>("")
  const [tagCharLimited, setTagCharLimited] = useState<string>("")

  // Coleta info pro post ao server
  const [todoInfo, setTodoInfo] = useState<TodoInfo>({
    name: "",
    description: "",
    tags: [""],
    date: dayjs().startOf('day').toDate(),
    time: null
  }); 

  // Edição de tags de acordo com o index no array
  const handleTagChange = (index: number, value: string) => {

    const maxTagSize = 50;

    if (value.length >= maxTagSize) {
      value = value.slice(0, 50);
      alert("Limite de caracteres para tag excedido");
    }
    
    
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
  const handlePostTodo = async () => {

    const {name, description, tags, date, time} = todoInfo;
    await postTodo(name, description, tags, date, time);

  };

  // Select de Date
  const handleChangeDate = (newDate: Dayjs | null)  => {

    if (newDate && dayjs().diff(newDate) > 0) {
      alert("Selecione uma data válida")
      return
    }

    setSelectedDate(newDate);
    setTodoInfo(todoObj => ({
    ...todoObj,
    date: newDate ? newDate.toDate() : null,
    
    
  }))
};

  // Select de HH:mm
  const handleChangeTime = (newDate: Dayjs | null)  => {

    if (newDate && dayjs().diff(newDate) > 0) {

      const roundUpToNext5 = (time: Dayjs) => {
      const minutes = time.minute();
      const rounded = Math.ceil(minutes / 5) * 5;
      return time.minute(rounded).second(0);
      }

      const corrected = roundUpToNext5(dayjs().add(1, "minutes"))
      setSelectedTime(corrected)

      alert("Selecione um horário válido")

      setTodoInfo(todoObj => ({
      ...todoObj,
      time: corrected ? corrected.toDate() : null
      }))

      console.log(selectedTime)
      
      return

    }

    setSelectedTime(newDate);
    setTodoInfo(todoObj => ({
    ...todoObj,
    time: newDate ? newDate.toDate() : null,

  }))
  };

  // AutoResize das tabs
  const handleAutoResize = (e: React.InputEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  // Coleta info da textbox NAME
  const handleNameChange = (e: ChangeEvent<HTMLTextAreaElement>) => {

    const maxNameSize = 200
    const input = e.target.value 

    setNameCharLimited(input)

    if (input.length >= maxNameSize) {

      setNameCharLimited(input.slice(0,200))
      alert("Limite de caracteres para tarefa exedido")


    }

   setTodoInfo((prev) => ({...prev, name: input}));
   
  }

  // Coleta info da textbox DESCRIPTION
  const handleDescChange = (e: ChangeEvent<HTMLTextAreaElement>) => {

    const maxDescSize = 200
    const input = e.target.value 

    setDescCharLimited(input)

    if (input.length >= maxDescSize) {

      setDescCharLimited(input.slice(0,200))
      alert("Limite de caracteres para descrição exedido")


    }

   setTodoInfo((prev) => ({...prev, description: e.target.value}))

  };

  


  return {
      
      handleTagChange,
      handleAddTag,
      handleChangeDate,
      handleChangeTime,
      handlePostTodo,
      handleNameChange,
      handleDescChange,
      handleAutoResize,
      todoInfo,
      setTodoInfo,
      nameCharLimited,
      descCharLimited,
      tagCharLimited,
      selectedDate,
      setSelectedTime,
      selectedTime

  }
} 