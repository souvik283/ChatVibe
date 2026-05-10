import express from "express"
import dotenv  from "dotenv"
import ConnectDb  from "./ConnectDB.js"

dotenv.config()
const app = express()

ConnectDb()

app.listen(process.env.port, ()=>{
    console.log(`Server started at port: ${process.env.port}`)
})
