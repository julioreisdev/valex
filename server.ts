import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cardsRouter from './routes/cardsRoutes'
import transactionsRoutes from './routes/transactionsRoutes'

dotenv.config();
const server = express();

server.use(cors(), express.json());
server.use(cardsRouter)
server.use(transactionsRoutes)

const PORT = process.env.PORT ? process.env.PORT : 5009 

server.listen(PORT, () => {
  console.log(`SERVER RUNNING IN THE PORT ${PORT}`);
});
