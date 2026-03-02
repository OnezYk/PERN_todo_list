import {IoMdCheckboxOutline} from "react-icons/io";

export const WelcomeBack = () => {
  return (
    <div className="flex-center bg-stone-200 font-inter">
      <WelcomeTab />
    </div>
  );
};

const WelcomeTab = () => {
  return (
    <div className="grid w-screen h-screen lg:w-[80%] lg:h-[82%] lg:grid-cols-[30%_1fr] overflow-hidden rounded-2xl shadow-2xl bg-white">

      <div className="hidden lg:block bg-stone-400">
        video
      </div>

        <GetStartedTab />

    </div>
  );
};

const GetStartedTab = () => {
  return (
    <div className="flex items-center justify-center lg:items-start flex-col lg:p-25.75">

      <p className={"text-[14px] text-stone-600"}>
        BEM VINDO DE VOLTA!
      </p>

      <div className="flex items-center gap-3 mt-1 text-stone-800">

        <p className="relative right-1 text-[60px] font-bold tracking-tight">
          Prioriza
        </p>

        <IoMdCheckboxOutline className="relative top-1 text-[2.3rem]" />

      </div>

      <p className="w-95 mt-8 text-stone-600 text-[1rem]">
        Organize suas tarefas com simplicidade. Gerencie suas prioridades e
        alcance seus objetivos, um passo de cada vez.
      </p>

      <button className="w-95 mt-8 btn-1 hover:shadow-[0_5px_20px_rgba(0,0,0,0.3)] cursor-pointer">
        Vamos lá
      </button>

      <p className="inline w-[80%] pt-4 mt-8 border-t text-[1rem] text-stone-400 border-t-stone-200 text-center lg:text-left">
        "Não deixo para amanhã o que posso deixar para a semana que vem."
      </p>
    </div>
  );
};
