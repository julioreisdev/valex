import { Router } from "express";
import { buy, recharge } from "../controller/transactionsController";
import { validateSchema } from "../middlewares/validateSchema";
import buySchema from "../schemas/buySchema";
import rechargeSchema from "../schemas/rechargeSchema";

const router = Router()

router.post('/recharge', validateSchema(rechargeSchema), recharge)
router.post('/buy', validateSchema(buySchema), buy)

export default router;