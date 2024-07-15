import { useContext, useEffect } from "react";
import Sidebar from "./Components/Sidebar"
import StudentHomePage from "./Pages/Students/StudentHomePage"
import User from "./Context/Context";
import { useNavigate } from "react-router";
import api from "./api/api";

function App() {
  const { user, setUser } = useContext(User);
  const navigate = useNavigate();

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
        // navigate("/login");
      }
    };

    if (!user) {
      fetchProfile();
    }
  }, [user, setUser, navigate]);

  return (
    <>
      <Sidebar title="Student | Dashboard">
        {user?.role == "student" ? <StudentHomePage /> : null}
      </Sidebar>
    </>
  )
}

export default App
