const StudentModel = require("../models/studentsModel");
const {hash} = require("bcrypt");
const {validationResult} = require("express-validator");

class StudentController {

    async createStudent(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        try {
            const {email, password, firstName, lastName, age, countryId, cityId} = req.body;

            const saltRounds = 10;
            const hashedPassword = await hash(password, saltRounds);
            const newStudent = await StudentModel.createStudent(email, hashedPassword, firstName, lastName, age, countryId, cityId);

            res.status(201).json(newStudent);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async getAllStudents(req, res) {
        try {
            const students = await StudentModel.getAllStudents();

            res.status(200).json(students);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async updateStudent(req, res) {
        const {id} = req.params;
        const {email, firstName, lastName, age, countryId, cityId} = req.body;

        try {
            const updatedStudent = await StudentModel.updateStudent(id, email, firstName, lastName, age, countryId, cityId);
            if (!updatedStudent) {
                return res.status(404).json({error: `Student with id ${id} not found`});
            }

            res.status(200).json(updatedStudent);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async getStudent(req, res) {
        const {id} = req.params;

        try {
            const student = await StudentModel.getStudent(id);

            res.status(200).json(student);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = new StudentController();
