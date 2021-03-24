//VALIDATION
const joi = require('joi');

exports.registerValidation = (data) => {
    const schema = joi.object({
        username: joi.string()
            .min(6)
            .required()
            .email(),
        password: joi.string()
            .min(6)
            .required()
    })
    return schema.validate(data)
}

exports.loginValidation = (data) => {
    const schema = joi.object({
        username: joi.string()
            .min(6)
            .required()
            .email(),
        password: joi.string()
            .min(6)
            .required()
    })
    return schema.validate(data)
}

// module.exports = registerValidation()
// module.exports = loginValidation()
