const {Router} = require('express');
const StudentController = require("../controllers/studentController");
const {studentValidator} = require("../validators/studentValidator");

const router = Router();

router.post('/', studentValidator, StudentController.createStudent);
router.get('/', StudentController.getAllStudents);
router.get('/:id', StudentController.getStudent);
router.put('/:id', studentValidator, StudentController.updateStudent);

module.exports = router;
