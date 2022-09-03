import { Router } from "express";
import { activateCard, balance, blockCard, postCard, unBlockCard } from "../controller/cardsController";
import { validateSchema } from "../middlewares/validateSchema";
import blockCardSchema from "../schemas/blockCardSchema";
import cardActivateSchema from "../schemas/cardActivateSchema";
import cardSchema from "../schemas/cardSchema";

const router = Router();

router.post('/cards', validateSchema(cardSchema), postCard);
router.post('/activate', validateSchema(cardActivateSchema), activateCard);
router.get('/balance/:cardId', balance);
router.post('/block', validateSchema(blockCardSchema), blockCard)
router.post('/unblock', validateSchema(blockCardSchema), unBlockCard)

export default router;