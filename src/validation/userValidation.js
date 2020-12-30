const Joi = require('joi')

const userValidation = (data) => {
   const schema = Joi.object({
    username: Joi.string().required().max(255),
    password: Joi.string().required().min(6)
   })
   return schema.validate(data)
}

module.exports = {
    userValidation
}