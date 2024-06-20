const db = require("../database/index");
class StudentModel {
    async createTable() {
        try {
          await db.query(`
          CREATE TABLE IF NOT EXISTS students (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          firstName VARCHAR(100) NOT NULL,
          lastName VARCHAR(100) NOT NULL,
          age INTEGER NOT NULL,
          countryId INTEGER REFERENCES countries(id),
          cityId INTEGER REFERENCES cities(id)
        )
      `);
        } catch (error) {
            console.error("Error creating table:", error);
        }
    }

    async createStudent(email, password, firstName, lastName, age, countryId, cityId) {
        try {
            const student = await db.query(
                `INSERT INTO students (email, password, firstName, lastName, age, countryId, cityId) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *` ,
                [email, password, firstName, lastName, age, countryId, cityId]
            );

            return student.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAllStudents() {
        try {
            const students = await db.query(`
                 SELECT 
                    students.id AS student_id,
                    students.email AS student_email,
                    students.firstName AS student_firstName,
                    students.lastName AS student_lastName,
                    students.age AS student_age,
                    countries.id AS country_id,
                    countries.name AS country_name,
                    cities.id AS city_id,
                    cities.name AS city_name
                FROM students
                JOIN countries ON students.countryId = countries.id
                JOIN cities ON students.cityId = cities.id
            `);
            return students.rows.map(row => ({
                id: row.student_id,
                email: row.student_email,
                firstName: row.student_firstName,
                lastName: row.student_lastName,
                age: row.student_age,
                Country: {
                    id: row.country_id,
                    name: row.country_name
                },
                City: {
                    id: row.city_id,
                    name: row.city_name
                }
            }));
        } catch (error) {
            throw error;
        }
    }

    async updateStudent(id, email, firstName, lastName, age, countryId, cityId) {
        try {
            const student = await db.query(
                `UPDATE students 
                 SET email = $2, firstName = $3, lastName = $4, age = $5, countryId = $6, cityId = $7 
                 WHERE id = $1 
                 RETURNING *`,
                [id, email, firstName, lastName, age, countryId, cityId]
            );

            return student.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getStudent(studentId) {
        try {
            const student = await db.query(`
                SELECT 
                students.id AS student_id,
                students.email AS student_email,
                students.firstName AS student_firstName,
                students.lastName AS student_lastName,
                students.age AS student_age,
                countries.id AS country_id,
                countries.name AS country_name,
                cities.id AS city_id,
                cities.name AS city_name
                FROM students
                JOIN countries ON students.countryId = countries.id
                JOIN cities ON students.cityId = cities.id
                WHERE students.id = $1
            `, [studentId]);

            return {
                id: student.rows[0].student_id,
                email: student.rows[0].student_email,
                firstName: student.rows[0].student_firstName,
                lastName: student.rows[0].student_lastName,
                age: student.rows[0].student_age,
                Country: {
                    id: student.rows[0].country_id,
                    name: student.rows[0].country_name
                },
                City: {
                    id: student.rows[0].city_id,
                    name: student.rows[0].city_name
                }
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports =  new StudentModel();