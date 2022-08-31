import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const server = express();

server.use(cors(), express.json());

server.listen(process.env.PORT, () => {
  console.log("SERVER RUNNING!");
});
