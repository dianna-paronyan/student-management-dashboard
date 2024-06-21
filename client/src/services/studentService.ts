import urls from "../common/urls.ts";
import httpService from "./httpService.ts";
import {Student} from "../models/studentModel.ts";

function StudentService() {

    async function getStudents(page: number, limit: number) {
        try {
            const response = await httpService.get(`${urls.STUDENTS}?page=${page}&limit=${limit}`);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async function getStudent(id: number) {
        try {
            const student = await httpService.get(urls.STUDENTS, id);
            return student;
        } catch (error) {
            throw error;
        }
    }

    async function createStudent(studentData: Student) {
        try {
            const student = await httpService.post(urls.STUDENTS, studentData);
            return student;
        } catch (error) {
            throw error;
        }
    }

    async function updateStudent(studentData: Student, id: number) {
        try {
            const student = await httpService.put(urls.STUDENTS, id, studentData);
            return student.data;
        } catch (error) {
            throw error;
        }
    }

    return {getStudents, getStudent, createStudent, updateStudent};
}

export default StudentService();