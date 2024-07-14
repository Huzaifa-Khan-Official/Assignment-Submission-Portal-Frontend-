import { useContext, useEffect } from "react";
import AllAssignmentsListing from "./Components/AllAssignmentsListing"
import Sidebar from "./Components/Sidebar"
import StudentHomePage from "./Pages/Students/StudentHomePage"
import User from "./Context/Context";
import { useNavigate } from "react-router";
import axios from "axios";
import api from "./api/api";
import PageTitle from "./Components/PageTitle";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import AssignmentSubmitFormModal from "./Components/AssignmentSubmitFormModal/AssignmentSubmitFormModal";

function App() {
  const { user, setUser } = useContext(User);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      api.get("/api/users/profile")
        .then(res => setUser(res.data))
        .catch(err => {
          err.response && navigate("/login");
        })
    }
  }, [user]);

  return (
    <>
      <PageTitle title="Home" />
      <Sidebar>
        <StudentHomePage />
        {/* <AdminDashboard /> */}
        {/* <AssignmentSubmitFormModal /> */}
      </Sidebar>
    </>
  )
}

export default App
