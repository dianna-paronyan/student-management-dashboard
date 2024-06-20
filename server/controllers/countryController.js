const CountryModel = require('../models/countriesModel');
const {validationResult} = require("express-validator");

class CountryController {

    async createCountry(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        try {
            const {name} = req.body;
            const newCountry = await CountryModel.createCountry(name);

            res.status(201).json(newCountry);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async getAllCountries(req, res) {
        try {
            const countries = await CountryModel.getAllCountries();

            res.status(200).json(countries);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async getCountry(req, res) {
        try {
            const {id} = req.params;
            const country = await CountryModel.getCountry(id);

            if (!country) {
                return res.status(404).json({error: "Country not found"});
            }

            res.status(200).json(country);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = new CountryController();
