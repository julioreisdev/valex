import joi from "joi";

const rechargeSchema = joi.object({
  cardId: joi.number().required(),
  value: joi.number().positive().required()
})

export default rechargeSchema;