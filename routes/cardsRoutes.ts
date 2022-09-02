import { Router } from "express";
import { postCard } from "../controller/cardsController";
import { validateSchema } from "../middlewares/validateSchema";
import cardSchema from "../schemas/cardSchema";

const router = Router();

router.post('/cards', validateSchema(cardSchema), postCard);

export default router;