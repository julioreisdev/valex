import joi from "joi";

const buySchema = joi.object({
    cardId: joi.number().required(),
    password: joi.string().required(),
    amount: joi.number().positive().required(),
    businessId: joi.number().required()
})

export default buySchema;