import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { WelcomeBack } from './pages/WelcomeBack'

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<WelcomeBack/>}/>
    </Routes>
  )
}
