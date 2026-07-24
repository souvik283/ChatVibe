import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ChatPage from './pages/ChatPage'
import Background from './components/Background'

const App = () => {
  return (
    <div className=' relative min-h-screen '>
      <Background/>
     <Routes>
        <Route path='/' element = {<HomePage/>} />
        <Route path='/login' element = {<LoginPage/>} />
        <Route path='/signup' element = {<SignUpPage/>} />
        <Route path='/chat' element = {<ChatPage/>} />
      </Routes>
  </div>
  )
}

export default App
