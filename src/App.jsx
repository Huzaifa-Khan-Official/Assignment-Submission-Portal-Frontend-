import { useContext, useEffect } from "react";
import Sidebar from "./Components/Sidebar"
import StudentHomePage from "./Pages/Students/StudentHomePage"
import User from "./Context/Context";
import { useNavigate } from "react-router";
import api from "./api/api";

function App() {
  const { user, setUser } = useContext(User);
  return (
    <>
      <Sidebar title="Student | Dashboard">
        {user?.role == "student" ? <StudentHomePage /> : null}
      </Sidebar>
    </>
  )
}

export default App
