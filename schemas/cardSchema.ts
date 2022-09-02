import joi from "joi";

const cardSchema = joi.object({
    employeId: joi.number().required(),
    cardType: joi.string().valid("groceries", "restaurants", "transport", "education", "health").required(),
    isVirtual: joi.boolean().required(),
})

export default cardSchema;