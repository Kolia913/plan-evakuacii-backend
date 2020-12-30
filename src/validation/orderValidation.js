const Joi = require('joi')

const orderValidation = (data) => {
    const schema = Joi.object({
        firstname: Joi.string().required().max(255),
        phone: Joi.string().required().min(7).max(11),
        email: Joi.string().required().email(),
        orgname: Joi.string().required().max(255),
        orgadres: Joi.string().required().max(255),
        count: Joi.number().required().min(1),
        // createdAt: Joi.date(),
        isDone: Joi.boolean()
    })
    return schema.validate(data)
}

module.exports = {
    orderValidation
}