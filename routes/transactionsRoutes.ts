import { Router } from "express";
import { recharge } from "../controller/transactionsController";
import { validateSchema } from "../middlewares/validateSchema";
import rechargeSchema from "../schemas/rechargeSchema";

const router = Router()

router.post('/recharge', validateSchema(rechargeSchema), recharge)

export default router;