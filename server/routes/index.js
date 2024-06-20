const {Router} = require("express");
const router = Router();
const countriesRoutes = require("./countryRoutes");
const citiesRoutes = require("./cityRoutes");
const studentRoutes = require("./studentRoutes");
const routes = require("../config/routes");

router.use(routes.COUNTRIES, countriesRoutes);
router.use(routes.CITIES, citiesRoutes);
router.use(routes.STUDENTS, studentRoutes);

module.exports = router;