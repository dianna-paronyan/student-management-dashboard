import {ChangeEvent, useEffect, useState} from "react";
import StudentService from "../../services/studentService.ts";
import {
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField
} from "@mui/material";
import {Edit as EditIcon, Delete as DeleteIcon} from '@mui/icons-material';
import {useNavigate} from "react-router-dom";
import {Student} from "../../models/studentModel.ts";

function Dashboard() {

    const [students, setStudents] = useState<Student[]>([]);
    const [searchByName, setSearchByName] = useState<string>("");
    const navigate = useNavigate();

    async function getStudents() {
        try {
            const studentsData = await StudentService.getStudents();
            setStudents(studentsData);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        async function fetchStudentsData() {
            await getStudents();
        }

        fetchStudentsData().catch(error => console.log(error));

    }, [])

    const filteredStudents = students?.filter((student: Student) =>
        student.firstName?.toLowerCase().includes(searchByName?.toLowerCase())
    )

    function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
        setSearchByName(event.target.value);
    }

    function navigateToAddStudent() {
        navigate('/add-student');
    }

    function navigateTiEditStudent(id: number | undefined) {
        navigate(`edit-student/${id}`);
    }

    function deleteStudent(id: number | undefined) {
        console.log(id);
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchByName}
                    onChange={handleSearchChange}
                    style={{marginRight: '20px'}}
                />
                <Button variant="contained" color="primary" onClick={() => navigateToAddStudent()}>
                    Add Student
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredStudents?.map((student: Student) => (
                            <TableRow key={student.id}>
                                <TableCell>{student.firstName}</TableCell>
                                <TableCell>{student.lastName}</TableCell>
                                <TableCell>{student.email}</TableCell>
                                <TableCell>{student.age}</TableCell>
                                <TableCell>{student.Country ? student.Country.name : ''}</TableCell>
                                <TableCell>{student.City ? student.City.name : ''}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => navigateTiEditStudent(student.id ?? undefined)}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton onClick={() => deleteStudent(student.id ?? undefined)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Dashboard;