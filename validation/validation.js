const Joi = require('@hapi/joi');


// Register validation
const registerValidation = data =>{
    const schema = Joi.object({
        name: Joi.string()
            .required(),
        id: Joi.string()
            .required()
            .min(7)
            .max(7),
        hash: Joi.string()
            .min(6)
            .required(),
        carrera: Joi.string()
            .required(),
        semestre: Joi.string()
            .required()
            .max(2)
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