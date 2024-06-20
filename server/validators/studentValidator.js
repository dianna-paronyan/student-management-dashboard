const { check } = require('express-validator');

const studentValidator = [
    check('email', 'Invalid email').isEmail().normalizeEmail(),
    check('password', 'Password must be at least 8 characters long').isLength({ min: 8 }),
    check('firstName', 'First name cannot be empty').notEmpty(),
    check('lastName', 'Last name cannot be empty').notEmpty(),
    check('age', 'Age must be between 18 and 100').isInt({ min: 18, max: 100 }),
    check('countryId', 'Country id must be an integer').isInt(),
    check('cityId', 'City id must be an integer').isInt(),
];

module.exports = {
    studentValidator,
};
