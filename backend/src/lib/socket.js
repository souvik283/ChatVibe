import { Server } from "socket.io";
import express from "express";
import http from "http";
import ENV from "./env.js";
import { socketAuthMiddleware } from "../middlewares/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [ENV.client_url],
    credentials: true,
  },
});

io.use(socketAuthMiddleware);



const userSocketmap = {};

export  function getRecieverSocketId(userId) {
  return userSocketmap[userId]
}

io.on("connection", (socket) => {
  console.log("A user connected: ", socket.user.name);

  const userId = socket.userId;
  userSocketmap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketmap));

  socket.on("disconnect", () => {
    console.log("A user disconnected: ", socket.user.name);
    delete userSocketmap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketmap));
  });
});


export {io, server, app}