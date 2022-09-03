import joi from "joi";

const rechargeSchema = joi.object({
  cardId: joi.number().required(),
  value: joi.number().min(0.1).required()
})

export default rechargeSchema;