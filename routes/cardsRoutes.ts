import { Router } from "express";
import { activateCard, postCard } from "../controller/cardsController";
import { validateSchema } from "../middlewares/validateSchema";
import cardActivateSchema from "../schemas/cardActivateSchema";
import cardSchema from "../schemas/cardSchema";

const router = Router();

router.post('/cards', validateSchema(cardSchema), postCard);
router.post('/activate', validateSchema(cardActivateSchema), activateCard);

export default router;