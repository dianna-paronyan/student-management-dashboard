const express = require("express");
const app = express()
const StudentModel = require("./models/studentsModel")
const router = require("./routes/index")
const CountriesModel = require("./models/countriesModel");
const CitiesModel = require("./models/citiesModel");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.listen(port, async () => {
    try {
        await CountriesModel.createTable();
        await CitiesModel.createTable();
        await StudentModel.createTable();
    } catch (error) {
        console.error("Error during startup:", error);
    }
});