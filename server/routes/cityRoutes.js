const {Router} = require("express");
const CityController = require("../controllers/cityController")
const cityValidator = require("../validators/cityValidator");

const router = Router();

router.post('/', cityValidator, CityController.createCity);
router.get('/', CityController.getAllCities);

module.exports = router;
