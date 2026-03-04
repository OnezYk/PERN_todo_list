import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useCreateTodo } from "../hooks/useCreateTodo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

export const CreateTodoTab = ({ closeTab }: { closeTab: () => void }) => {

  const {
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
  } = useCreateTodo()


  return (
    <div
      onClick={closeTab}
      className="flex absolute justify-center items-center left-0 w-screen h-screen"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`z-50 absolute font-medium min-w-200 flex flex-col items-center bg-white rounded-xl shadow-xl border border-stone-200 overflow-hidden cursor-default`}
        style={{animation: "fadeIn 0.2s ease forwards"}}
      >

        <div className="flex flex-col w-full">
          
          <textarea
            autoFocus
            placeholder="Insira sua tarefa aqui"
            rows={1}
            onChange={handleNameChange}
            onInput={handleAutoResize}
            className="resize-none w-full pt-4 px-6 outline-none focus:ring-0 border-0 text-[22px]"
          />
          
          <textarea
            placeholder="Insira sua desc aqui"
            rows={1}
            onChange={handleDescChange}
            onInput={handleAutoResize}
            className="w-full pl-8 px-6 pb-4 overflow-hidden outline-none resize-none focus:ring-0 border-0 border-b text-[16px] text-stone-500 border-stone-300"
          />

          <div className="flex border-b border-stone-300">
            <div className="p-4 w-100 flex gap-2 items-center flex-wrap border-stone-300 border-r">
              <p>Tags: </p>
              {todoInfo.tags.map((tag, i) => (
                <CreateTag
                  key={i}
                  value={tag}
                  onChange={(val) => handleTagChange(i, val)}
                  addTag={
                    i === todoInfo.tags.length - 1 ? handleAddTag : () => {}
                  }
                />
              ))}
            </div>

            <div className="flex mx-auto my-auto h-full">
              <div className=" h-10 p-4 mx-2 mb-1 flex gap-2 text-[15px] items-center">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={selectedDate}
                    onChange={handleChangeDate}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>

          <button onClick={handlePostTodo} className="btn-1 w-60 h-12 px-13 py-3 my-2 m-auto gap-2 font-medium">
            Completar
          </button>
          
        </div>
      </div>
    </div>
  );
};

const CreateTag = ({
  addTag,
  value,
  onChange,
}: {
  addTag: () => void;
  value: string;
  onChange: (val: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <input
      type="text"
      placeholder={open ? "" : "+"}
      value={value}
      onClick={() => {
        if (!open) {
          setOpen(true);
          addTag();
        }
      }}
      onChange={(e) => {
        onChange(e.target.value);
        e.currentTarget.style.width = e.target.value.length + 5 + "ch";
      }}
      className={`rounded-full py-1.5 px-3 ${open ? "w-16" : "w-10"} hover:cursor-pointer placeholder:text-[22px] placeholder:font-bold text-center transition-all duration-300 bg-stone-200`}
    />
  );
};
