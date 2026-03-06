import React, { type ReactNode } from 'react'
import { CgGoogleTasks } from 'react-icons/cg'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { FaRegCircleCheck } from 'react-icons/fa6'
import { LuTag } from 'react-icons/lu'
import { Link, useLocation } from 'react-router-dom'

export const Navbar = () => {

  return (
    <div className='flex flex-col w-[18%] h-screen bg-[rgb(231,231,228)] border-r border-stone-300'>

        <div className='p-7.5 border-b border-stone-300'>

          <Link to={"/home"} className='flex items-center justify-center w-13 h-13 p-2 rounded-lg bg-stone-600 shadow-xl hover:bg-stone-500 hover:scale-110 active:scale-100 transition-all'>
            <CgGoogleTasks className='text-white scale-200' />
          </Link>

        </div>

        <ul className='flex flex-col gap-1 mt-5 px-3 text-[18px] text-stone-800'>

          <p className='pl-6 mb-1 font-medium text-stone-500'>Menu principal</p>

          <Nav linkTo='/home' icon={<FaRegCircleCheck className='scale-150' />}>Afazeres hoje</Nav>
          <Nav linkTo='/calendar' icon={<FaRegCalendarAlt className='scale-150' />}>Calendário</Nav>
          <Nav linkTo='/tags' icon={<LuTag className='scale-150' />}>Tags</Nav>
          
        </ul>

        <footer className='mt-auto h-50 p-8 border-t border-stone-300'>
          <div className='h-full w-full flex'>
            <div>Dark/lightmode</div>
          </div>
        </footer>
      
    </div>
  )

}

const Nav = ({children, icon, linkTo} : {children:ReactNode, icon: ReactNode, linkTo: string}) => {

  const { pathname } = useLocation();

  return(
    <Link to={linkTo} className={`flex items-center px-6 py-3 gap-5 rounded-xl hover:cursor-pointer transition-colors ${pathname == linkTo ? "bg-stone-600 text-stone-100" : "hover:bg-stone-300"}`}> 
      {icon}
      <p className='font-medium tracking-tight'> {children} </p>

    </Link>
  )

}