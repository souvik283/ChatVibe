import express from "express"
import ENV from "./lib/env.js"
import  ConnectDb  from "./lib/ConnectDB.js"
import path from "path"
import authRoute from "./routes/auth.route.js"
import cookieParser from "cookie-parser"


const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

const __dirname = path.resolve()



app.use("/api/auth", authRoute)

if(ENV.node_environment === "production"){

    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    })
}

app.listen(ENV.port, () => {
    console.log(`Server started at port: ${ENV.port}`)
    ConnectDb()
})