// DNS Fix (put first)
import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);

import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";

const app = express();
const server = http.createServer(app);

// middleware
app.use(express.json({ limit: "4mb" }));
app.use(cors());


// status route
app.get("/api/status", (req, res) => {
  res.send("Server is live");
});

// connect mongodb
await connectDB();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log("Server is running on PORT " + PORT)
);
