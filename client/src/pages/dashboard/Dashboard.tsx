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
    TableRow,
    TextField,
    TablePagination
} from "@mui/material";
import {Edit as EditIcon, Delete as DeleteIcon} from '@mui/icons-material';
import {useNavigate} from "react-router-dom";
import {Student} from "../../models/studentModel.ts";

function Dashboard() {
    const [students, setStudents] = useState<Student[]>([]);
    const [searchByName, setSearchByName] = useState<string>("");
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [totalStudents, setTotalStudents] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchStudentsData() {
            await getStudents();
        }

        fetchStudentsData().catch(error => console.log(error));
    }, [page, limit]);

    async function getStudents() {
        try {
            const response = await StudentService.getStudents(page + 1, limit);
            setStudents(response.students);
            setTotalStudents(response.totalCount);
        } catch (error) {
            console.error(error);
        }
    }

    const filteredStudents = students?.filter((student: Student) =>
        student.firstName?.toLowerCase().includes(searchByName?.toLowerCase())
    );

    function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
        setSearchByName(event.target.value);
    }

    function navigateToAddStudent() {
        navigate('/add-student');
    }

    function navigateToEditStudent(id: number | undefined) {
        navigate(`edit-student/${id}`);
    }

    function handleDeleteStudent(id: number | undefined) {
        console.log(id);
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(0);
    };

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
                <Button variant="contained" color="primary" onClick={navigateToAddStudent}>
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
                                    <IconButton onClick={() => navigateToEditStudent(student.id ?? undefined)}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteStudent(student.id ?? undefined)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 20, 50]}
                component="div"
                count={totalStudents}
                rowsPerPage={limit}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default Dashboard;
