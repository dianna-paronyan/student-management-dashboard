const db = require("../database/index");

class CityModel {
    async createTable() {
        try {
            await db.query(`
                CREATE TABLE IF NOT EXISTS cities (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(100) NOT NULL UNIQUE,
                    countryId INTEGER REFERENCES countries(id)
                )
            `);
        } catch (error) {
            console.error("Error creating table:", error);
        }
    }

    async createCity(name, countryId) {
        try {
            const city = await db.query(
                `INSERT INTO cities (name, countryId) VALUES ($1, $2) RETURNING *`,
                [name, countryId]
            );

            return city.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAllCities() {
        try {
            const cities = await db.query(`SELECT * FROM cities`);

            return cities.rows;
        } catch (error) {
            throw error;
        }
    }

    async getCity(id) {
        try {
            const result = await db.query(
                `SELECT * FROM cities WHERE id = $1`,
                [id]
            );

            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new CityModel();
