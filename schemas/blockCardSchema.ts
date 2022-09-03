import joi from "joi";

const blockCardSchema = joi.object({
  cardId: joi.number().required(),
  password: joi.string().required()
})

export default blockCardSchema;