import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './Layout'

import { WelcomeBack } from './pages/WelcomeBack'
import { Home } from './pages/Home'
import { Calendar } from './pages/Calendar'
import { Tags } from './pages/Tags'

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<WelcomeBack/>}/>
      <Route element={<Layout/>}>
        <Route path="/home" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/tags" element={<Tags />} />
      </Route>
    </Routes>
  )
}
