// DNS Fix (put first)
import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);

import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/UserRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

// http sever
const app = express();
const server = http.createServer(app);

// socket.io server
export const io = new Server(server, {
  cors: { origin: "*" }
})

// store online user
export const userSocketMap = {}; // {userId : socketId}

// socket.op conn  handler
io.on("connection",(socket)=>{
  const userId = socket.handshake.query.userId;
  console.log("User connected", userId)

  if(userId) userSocketMap[userId] = socket.id

  // emit online user to all conecnted client

  io.emit("getOnlineUsers", Object.keys(userSocketMap))

  socket.on("disconnect", ()=>{
    console.log("user disconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
  })
})



// middleware
app.use(express.json({ limit: "4mb" }));
app.use(cors());


// Route statup route
app.get("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth", userRouter)
app.use("/api/messages", messageRouter)
// connect mongodb
await connectDB();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log("Server is running on PORT " + PORT)
);
