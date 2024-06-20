const db = require("../database/index");

class CountryModel {
    async createTable() {
        try {
            await db.query(`
                CREATE TABLE IF NOT EXISTS countries (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(100) NOT NULL UNIQUE
                )
            `);
        } catch (error) {
            console.error("Error creating table:", error);
        }
    }

    async createCountry(name) {
        try {
            const country = await db.query(
                `INSERT INTO countries (name) VALUES ($1) RETURNING *`,
                [name]
            );

            return country.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAllCountries() {
        try {
            const countries = await db.query(`SELECT * FROM countries`);

            return countries.rows;
        } catch (error) {
            throw error;
        }
    }

    async getCountry(id) {
        try {
            const result = await db.query(
                `SELECT * FROM countries WHERE id = $1`,
                [id]
            );

            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new CountryModel();
