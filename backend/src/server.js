import express from "express";
import ENV from "./lib/env.js";
import ConnectDb from "./lib/ConnectDB.js";
import path from "path";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import {app, server} from "./lib/socket.js"

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
app.use(cookieParser());

const corsLink = ENV.node_environment === "development" ? ENV.client_url : ENV.host_web_url

app.use(cors({ origin: corsLink, credentials: true }));

const __dirname = path.resolve();

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);



// if (ENV.node_environment === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
//   });
// }

const PORT = ENV.port|| 2000;


server.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
  ConnectDb();
});