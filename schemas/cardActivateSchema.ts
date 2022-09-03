import joi from "joi";

const cardActivateSchema = joi.object({
    employeId: joi.number().required(),
    cardType: joi.string().valid("groceries", "restaurants", "transport", "education", "health").required(),
    cvc: joi.string().min(3).max(3).required(),
    password: joi.string().min(4).required()
})

export default cardActivateSchema;