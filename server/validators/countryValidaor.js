const { check } = require('express-validator');

const countryValidator = [
    check('name', 'Country name cannot be empty').notEmpty(),
];

module.exports = countryValidator;
