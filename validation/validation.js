const Joi = require('@hapi/joi');


// Register validation
const registerValidation = data =>{
    const schema = Joi.object({
        name: Joi.string()
            .required(),
        id: Joi.string()
            .required(),
        hash: Joi.string()
            .min(6)
            .required()
    });
    return schema.validate(data);
};

const loginValidation = data =>{
    const schema = Joi.object({
        id: Joi.string()
            .required(),
        hash: Joi.string()
            .min(6)
            .required()
    });
    return schema.validate(data);
};



module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;