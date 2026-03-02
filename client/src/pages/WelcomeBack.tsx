import React, { type ReactNode } from 'react'

export const WelcomeBack = () => {

  return (
    <div className='flex-center bg-stone-200 font-inter'>
      <WelcomeTab/>
    </div>
  )
}

const WelcomeTab = () => {

  return (
    <div className='grid lg:w-[70%] lg:h-[82%] grid-cols-[342px_1fr] rounded-2xl shadow-2xl bg-white'>
      <div className='bg-stone-400'>video</div>
      <GetStartedTab/>
    </div>
  )

}

const GetStartedTab = () => {

  const colors = {
    strong: "text-[#292524]",
    medium: "text-[#57534D]",
    weak: "text-[#A6A09B]"
  }
  
  return (
    <div className='p-[103px]'>
      <p className={`text-[14px] ${colors.medium}`}>BEM VINDO DE VOLTA!</p>
      <div>
        <p className={`relative right-1 p-32px text-[60px] ${colors.strong}`}>Prioriza</p>
        
      </div>
    </div>
  )

}