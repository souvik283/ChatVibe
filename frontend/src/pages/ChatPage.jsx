import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router'
import AuroraChat from './NoFound'

const ChatPage = () => {
  const {logout} = useAuthStore()

  const handleLogout = (e)=>{
    e.preventDefault()
    logout()
  }
  return (
    <div className=' flex items-center justify-center min-h-screen'>
      <AuroraChat/>
      
    </div>
  )
}

export default ChatPage
