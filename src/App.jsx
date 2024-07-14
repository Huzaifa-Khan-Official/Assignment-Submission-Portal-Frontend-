import { useContext, useEffect } from "react";
import AllAssignmentsListing from "./Components/AllAssignmentsListing"
import Sidebar from "./Components/Sidebar"
import StudentHomePage from "./Pages/Students/StudentHomePage"
import User from "./Context/Context";
import { useNavigate } from "react-router";
import axios from "axios";
import api from "./api/api";

function App() {
  const { user, setUser } = useContext(User);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) {
  //     api.get("/api/users/profile")
  //       .then(res => setUser(res.data))
  //       .catch(err => {
  //         err.response && navigate("/login");
  //       })
  //   }
  // }, [user]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/users/profile");
        console.log("fetched data from db")
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error.message);
        localStorage.removeItem('token');
        setUser(null);
        navigate("/login");
      }
    };

    if (!user) {
      fetchProfile();
    }
  }, [user, setUser, navigate]);

  return (
    <>
      <Sidebar>
        <StudentHomePage />
      </Sidebar>
    </>
  )
}

export default App
