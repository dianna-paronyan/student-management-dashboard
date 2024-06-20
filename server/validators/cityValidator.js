const {check} = require('express-validator');

const cityValidator = [
    check('name', 'City name cannot be empty').notEmpty(),
    check('countryId', 'Country id must be an integer').isInt(),
];

module.exports = cityValidator;
