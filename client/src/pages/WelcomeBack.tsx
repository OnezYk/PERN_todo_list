import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";


export const WelcomeBack = () => {

  useEffect (() => {

    AOS.init ({
      duration:1000,
      once: true,
    })

    return () => {
      AOS.refreshHard()
    }

  }, [])

  return (
    <div className="flex-center bg-stone-200 font-inter">
      <WelcomeTab />
    </div>
  );
};

const WelcomeTab = () => {
  return (
    <div data-aos='fade-in' className="grid w-screen h-screen lg:w-[80%] lg:h-[82%] overflow-hidden lg:grid-cols-[30%_1fr] rounded-2xl shadow-2xl bg-white">

      <div className="hidden lg:block bg-stone-400">
        video
      </div>

        <GetStartedTab />

    </div>
  );
};

const GetStartedTab = () => {

  const [checked, setChecked] = useState(true)

  return (


    <div className="flex items-center justify-center lg:items-start flex-col lg:p-25.75">

      <p data-aos='fade-in' data-aos-delay="200" className={"text-[14px] text-stone-600"}>
        BEM VINDO DE VOLTA!
      </p>

      <div data-aos='fade-in' data-aos-duration='2000' data-aos-delay="500" className="flex items-center gap-4 mt-1 text-stone-800">

        <p className="relative right-1 text-[60px] font-bold tracking-tight">
          Prioriza
        </p>

        <div className='relative mt-2'>
          <label htmlFor="checkbox" className="flex items-center cursor-pointer gap-2">
            <input
              id="checkbox"
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
              className="hidden"
            />
            <div className={`shadow-lg animate-breathe w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200
                ${checked ? 'bg-stone-600 border-stone-600' : 'bg-white border-stone-400'}`}
            >
            {checked && (
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
            </div>
          </label>
        </div>

      </div>

      <p data-aos='fade-left' data-aos-delay="1200" className="w-95 mt-8 text-stone-600 text-[1rem]">
        Organize suas tarefas com simplicidade. Gerencie suas prioridades e
        alcance seus objetivos, um passo de cada vez.
      </p>

      <button className="animate-zoom-in shadow-lg w-95 mt-8 btn-1 hover:scale-95 hover:shadow-[0_5px_20px_rgba(0,0,0,0.3)] cursor-pointer">
        Vamos lá
      </button>

      <p data-aos='fade-left' data-aos-delay="1500" className="inline w-[80%] pt-4 mt-8 border-t text-[1rem] text-stone-400 border-t-stone-200 text-center lg:text-left">
        "Não deixo para amanhã o que posso deixar para a semana que vem."
      </p>
    </div>
  );
};
