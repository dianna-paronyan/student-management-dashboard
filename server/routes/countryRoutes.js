const {Router} = require("express");
const CountryController = require("../controllers/countryController")
const countryValidator = require("../validators/countryValidaor");

const router = Router();

router.post('/', countryValidator, CountryController.createCountry);
router.get('/', CountryController.getAllCountries);

module.exports = router;
