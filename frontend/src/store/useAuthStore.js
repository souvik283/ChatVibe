import { create } from 'zustand'

const useAuthStore = create((set)=> ({
    authUser: {name: "souvik", _id: 123, age: 20},
    isLoggedin: false,

    login : () =>{
        console.log("user logged in successfully")
        set({isLoggedin: true})
    }
})) 
