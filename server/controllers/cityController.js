const CityModel = require('../models/citiesModel');
const {validationResult} = require("express-validator");

class CityController {

    async createCity(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        try {
            const {name, countryId} = req.body;

            const newCity = await CityModel.createCity(name, countryId);
            res.status(201).json(newCity);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async getAllCities(req, res) {
        try {
            const cities = await CityModel.getAllCities();
            res.status(200).json(cities);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async getCity(req, res) {
        try {
            const {id} = req.params;
            const city = await CityModel.getCity(id);

            if (!city) {
                return res.status(404).json({error: "City not found"});
            }

            res.status(200).json(city);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = new CityController();
