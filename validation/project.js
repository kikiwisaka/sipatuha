const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProjectInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.technology = !isEmpty(data.technology) ? data.technology : '';
    data.owner = !isEmpty(data.owner) ? data.owner : '';

    if (!Validator.isLength(data.name, { min: 3, max: 50 })) {
        errors.name = 'Project name needs to be between 3 and 50 characters';
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = 'Project name is required';
    }

    if (Validator.isEmpty(data.description)) {
        errors.description = 'Description is required';
    }
    
    if (Validator.isEmpty(data.technology)) {
        errors.technology = 'Technology is required';
    }  

    if (Validator.isEmpty(data.owner)) {
        errors.owner = 'Project owner is required';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
};