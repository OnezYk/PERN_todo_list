
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosCalendar } from "react-icons/io";
import { MdClose, MdEdit } from "react-icons/md";

export const Todo = ({ name = "Lavar a louça", tags = ["casa", "urgente"], concluido: init = false }) => {
  const [concluido, setConcluido] = useState(init);
  const [aberto, setAberto] = useState(false);

  return (
    <div onClick={() => setAberto (p => !p)} className={`flex text-stone-800 items-center gap-4 px-5 py-4 rounded-xl border transition-all duration-300 hover:cursor-pointer ${concluido ? "bg-stone-100 border-stone-200" : "bg-white border-stone-300 shadow-md"}`}>
      
    {aberto && (
    <div onClick={(e) => { e.stopPropagation(); setAberto(false); }}  className="flex left-0 top-0 absolute z-10 h-screen w-screen justify-center items-center backdrop-blur-[2px] bg-[rgba(0,0,0,0.2)]"
    style={{ animation: "fadeIn 0.2s ease forwards" }}>
      <EditTab closeTab={() => setAberto(p => !p)}/>
    </div>
    )}  

      <input
        type="checkbox"
        checked={concluido}
        onClick={(e) => e.stopPropagation()}
        onChange={() => setConcluido(p => !p)}
        className="w-5 h-5 rounded accent-stone-600 cursor-pointer shrink-0"
      />

      <div className="flex flex-1 gap-1">
        <p className={`text-[15px] font-bold transition-all ${concluido ? "line-through text-stone-400" : "text-stone-800"}`}>
          {name}
        </p>

      </div>

      <div className="flex gap-10">
        <div className="flex items-center gap-2">
          {tags.map(tag => (
            <span key={tag} className="text-[14px] px-4 py-1.5 rounded-full bg-stone-200 text-stone-500 font-medium">
              {tag}
            </span>
          ))}
        </div>
        <button onClick={(e) => e.stopPropagation()} className="p-3 bg-stone-100 rounded-xl text-stone-400 hover:text-red-400 hover:bg-red-100 transition-colors cursor-pointer">
          <FaRegTrashAlt size={16} />
        </button>
      </div>

    </div>
  );
};

const EditTab = ({closeTab}: {closeTab: () => void}) => {

  return (

    <div onClick={(e) => e.stopPropagation()} className="font-medium h-100 min-w-200 min-h-100 flex flex-col items-center bg-white rounded-xl shadow-xl border border-stone-200 overflow-hidden cursor-default">
      <div className="h-12 w-full flex justify-between items-center py-8 px-4 border-b border-stone-300">

        <div className="flex items-center gap-3">

          <MdEdit size={20}/>
          Editar tarefa
        </div>

        <button onClick={closeTab} className="relative hover:cursor-pointer">
          <MdClose size={30}/>
        </button>

      </div>

      <div className="flex-1 grid w-full grid-cols-[1fr_210px]">

        <div className="border-r border-stone-300">

          <div className="p-4 flex items-center gap-8">
            <input
              type="checkbox"
              className="w-5 h-5 rounded accent-stone-600 cursor-pointer shrink-0"
            />
            <p className="wrap-break-word line-clamp-2 max-w-140">Fetch name</p>
          </div>

          <input 
            type="text" 
            placeholder="Fetch description" 
            className="ml-17 max-w-120 text-stone-500 text-[14px] outline-none focus:ring-0 border-0 placeholder:text-stone-500 placeholder:text-[14px]"
          />

          <div className="w-full h-px bg-stone-300 mt-5"></div>

          <div className="p-4 w-120 flex gap-2 items-center flex-wrap hover:cursor-pointer">
            <p>Tags: </p>
            <div className="bg-red-200 rounded-full py-1.5 px-3">FETCH CUSTOM COLOR</div>
          </div>

        </div>

        <div className="flex flex-col gap-2 bg-[rgb(231,231,228)]">
          <p className="pl-5 pt-5 text-stone-500">Data:</p>
          <div className="pl-3 py-1.75 mx-2 mb-1 flex gap-2 text-[15px] items-center hover:bg-stone-400 rounded-xl transition-colors">
            <IoIosCalendar size={20}/>
            Fetch data colocada
          </div>
          <div className="border-stone-300 border-b hover:bg-stone-500"></div>
        </div>

      </div>

    </div>

  )
  
}