import { useContext, useEffect } from "react";
import Sidebar from "./Components/Sidebar"
import StudentHomePage from "./Pages/Students/StudentHomePage"
import User from "./Context/Context";
import { useNavigate } from "react-router";
import api from "./api/api";

function App() {
  const { user, setUser } = useContext(User);
  const navigate = useNavigate();
  return (
    <>
      <Sidebar title="Student | Dashboard">
        {user?.role == "student" ? <StudentHomePage /> : user?.role == "trainer" ? navigate("/trainer/dashboard") : user?.role == "admin" ? navigate("/admin/dashboard") : null}
      </Sidebar>
    </>
  )
}

export default App
