import Sidebar from "./Components/Sidebar"
import StudentHomePage from "./Pages/Students/StudentHomePage"
import { useNavigate } from "react-router";
import useFetchProfile from "./utils/useFetchProfile";
import AllStudentGradePage from "./Pages/Trainer/AllStudentGradePage";

function App() {
  const { user, setUser } = useFetchProfile();
  const navigate = useNavigate();

  return (
    <>
      <Sidebar title="Student | Dashboard">
        {user?.role == "student" ? <StudentHomePage /> : user?.role == "trainer" ? navigate("/trainer/dashboard") : user?.role == "admin" ? navigate("/admin/dashboard") : null}
        <AllStudentGradePage />
      </Sidebar>
    </>
  )
}

export default App
