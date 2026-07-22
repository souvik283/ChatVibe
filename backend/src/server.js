import express from "express"
import dotenv from "dotenv"
import  ConnectDb  from "./lib/ConnectDB.js"
import path from "path"
import authRoute from "./routes/auth.route.js"
import cookieParser from "cookie-parser"

dotenv.config()

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

const __dirname = path.resolve()



app.use("/api/auth", authRoute)

if(process.env.NODE_ENV === "production"){

    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    })
}

app.listen(process.env.port, () => {
    console.log(`Server started at port: ${process.env.port}`)
    ConnectDb()
})