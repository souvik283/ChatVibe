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

app.use(cors({ origin: ENV.client_url, credentials: true }));

const __dirname = path.resolve();

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);



if (ENV.node_environment === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

server.listen(ENV.port, () => {
  console.log(`Server started at port: ${ENV.port}`);
  ConnectDb();
});