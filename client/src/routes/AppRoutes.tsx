import {Route, Routes} from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard.tsx";
import AddStudent from "../pages/addStudent/AddStudent.tsx";
import EditStudent from "../pages/editStudent/EditStudent.tsx";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/add-student" element={<AddStudent/>}/>
            <Route path="/edit-student/:id" element={<EditStudent/>}/>
        </Routes>
    )
}

export default AppRoutes;