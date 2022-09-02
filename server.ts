import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cardsRouter from './routes/cardsRoutes'

dotenv.config();
const server = express();

server.use(cors(), express.json());
server.use(cardsRouter)

server.listen(process.env.PORT, () => {
  console.log("SERVER RUNNING!");
});
