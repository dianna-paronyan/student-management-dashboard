import {Route, Routes} from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard.tsx";
import AddStudent from "../pages/addStudent/AddStudent.tsx";
import EditStudent from "../pages/editStudent/EditStudent.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/add-student" element={<AddStudent/>}/>
                <Route path="/edit-student/:id" element={<EditStudent/>}/>
            </Routes>
            <ToastContainer/>
        </>
    )
}

export default AppRoutes;