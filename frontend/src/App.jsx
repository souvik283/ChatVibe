import React, { useEffect} from 'react'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ChatPage from './pages/ChatPage'
import Background from './components/Background'
import { useAuthStore } from './store/useAuthStore'
import Loading from './components/Loading'
import Error404 from './pages/Error404'
import {Toaster} from "react-hot-toast";
import LoaderIcon from './components/LoaderIcon'

const App = () => {
  const {authUser,isCheckingAuth, checkAuth} = useAuthStore()

    useEffect(()=>{
      checkAuth()
    },[checkAuth]);

    console.log({authUser}); 
    
     if (isCheckingAuth) {
   return(
   <div>
    <Background/>
    <Loading/>
   </div>
   )
  }
  return (

   <div className=' relative min-h-screen '>
      
      <Background/>
     <Routes>
        <Route path='/' element = {<HomePage/>} />
        <Route path='/login' element = {!authUser ? <LoginPage/> : <Navigate  to={"/chat"}/>} />
        <Route path='/chat' element = {authUser ? <ChatPage/> : <Navigate  to={"/login"}/>} />
        <Route path='*' element = {<Error404/>} />
      </Routes>
      <Toaster/>
  </div>
  )
}

export default App
