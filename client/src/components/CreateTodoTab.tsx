import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { useCreateTodo } from "../hooks/useCreateTodo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { MdAccessTime } from "react-icons/md";
import { IoClose } from "react-icons/io5";

dayjs().locale("pt_br")

export const CreateTodoTab = ({ closeTab, onSubmit }: { closeTab: () => void, onSubmit: () => void }) => {

  const [timeOpen, setTimeOpen] = useState(false)

  const {
    handleTagChange, 
    handleAddTag,  
    handleChangeDate, 
    handleChangeTime,
    handlePostTodo,
    handleNameChange,
    handleDescChange,
    handleAutoResize,
    todoInfo,
    nameCharLimited,
    descCharLimited,
    tagCharLimited,
    selectedDate,
    setSelectedTime,
    selectedTime

  } = useCreateTodo()

  const handleSubmit = async () => {
  await handlePostTodo();
  onSubmit();
  closeTab();
}

  const handleCloseTime = () => {
    setTimeOpen(false)
    setSelectedTime(null)
  }

  return (
    <div
      onClick={closeTab}
      className="flex absolute justify-center items-center left-0 w-screen h-screen"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`z-50 absolute font-medium max-w-300 flex flex-col items-center bg-white rounded-xl shadow-xl border border-stone-200 overflow-hidden cursor-default`}
        style={{animation: "fadeIn 0.2s ease forwards"}}
      >

        <div className="relative flex flex-col w-full">
          
          <textarea
            autoFocus
            placeholder="Insira sua tarefa aqui"
            rows={1}
            onChange={handleNameChange}
            onInput={handleAutoResize}
            value={nameCharLimited}
            className="resize-none w-full pt-4 px-6 outline-none focus:ring-0 border-0 text-[22px]"
          />

          <textarea
            placeholder="Insira sua desc aqui"
            rows={1}
            onChange={handleDescChange}
            onInput={handleAutoResize}
            value={descCharLimited}
            className="w-full pl-8 px-6 pb-4 overflow-hidden outline-none resize-none focus:ring-0 border-0 border-b text-[16px] text-stone-500 border-stone-300"
          />

          <div className="flex border-b border-stone-300">
            <div className="p-4 min-w-100 max-w-200 flex gap-2 items-center flex-wrap border-stone-300 border-r">
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

            <div className="flex relative my-auto h-full justify-center mx-2">
              <div className=" h-10 mb-1 flex gap-2 text-[15px] items-center">
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                  <div className="flex gap-2 items-center">
                    
                    <DatePicker
                      value={selectedDate}
                      onChange={(newDate) => {
                          handleChangeDate(newDate);
                      }}
                    />

                    {
                    !timeOpen && 
                    <div onClick={() => setTimeOpen (p => !p)} className={`flex justify-center items-center w-14 h-14 border border-stone-300 rounded mr-2 hover:scale-95 hover:text-stone-700 transition-all`}>
                      <MdAccessTime className="text-stone-500" size={25} />
                    </div>
                    }

                    {
                    timeOpen && 
                    <div className="flex gap-2 items-center">
                      <TimePicker
                        label="Horário"
                        value={selectedTime}
                        onChange={(newDate) => {
                          if (newDate) {
                            handleChangeTime(newDate);
                          }
                        }}
                      />
                      <div onClick={handleCloseTime} className="flex items-center justify-center hover:scale-95 hover:text-stone-700 transition-all border h-14 w-8 rounded cursor-pointer border-stone-300">
                        <IoClose/>
                      </div>
                    </div>
                    }

                  </div>
                </LocalizationProvider>
              </div>
            </div>
          </div>

          <button onClick={handleSubmit} className="btn-1 w-60 h-12 px-13 py-3 my-2 m-auto gap-2 font-medium">
            Finalizar tarefa
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
          const length = e.target.value.length + 5;
          e.currentTarget.style.width = Math.min(length, 98) + "ch";
        }}
      className={`rounded-full py-1.5 px-3 ${open ? "w-16" : "w-10"} hover:cursor-pointer placeholder:text-[22px] placeholder:font-bold text-center transition-all duration-300 bg-stone-200`}
    />
  );
};
