import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router'

const ChatPage = () => {
  const {logout} = useAuthStore()

  const handleLogout = (e)=>{
    e.preventDefault()
    logout()
  }
  return (
    <div>
      
      <button
      className=' px-3 py-2 bg-purple-700 m-3 rounded-md font-bold cursor-pointer'
      onClick={
        handleLogout
      }
      >
        Logout
      </button>
    </div>
  )
}

export default ChatPage
