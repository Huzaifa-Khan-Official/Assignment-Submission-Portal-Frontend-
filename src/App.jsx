import { useContext, useEffect } from "react";
import Sidebar from "./Components/Sidebar"
import StudentHomePage from "./Pages/Students/StudentHomePage"
import User from "./Context/Context";
import { useNavigate } from "react-router";
import api from "./api/api";
import LoaderContext from "./Context/LoaderContext";
import Loader from "./Components/Loader";
import CreateAssignment from "./Components/CreateAssignment";

function App() {
  const { user, setUser } = useContext(User);
  const navigate = useNavigate();
  const { loader, setLoader } = useContext(LoaderContext);

  useEffect(() => {
    if (!user) {
      setLoader(true);
      api.get("/api/users/profile")
        .then(res => {
          setUser(res.data);
          setLoader(false);
          navigate("/");
        })
        .catch(err => {
          setLoader(false);
          console.log(err);
        });
    }
  }, [])

  return (
    <>
      <Sidebar title="Student | Dashboard">
        {user?.role == "student" ? <StudentHomePage /> : user?.role == "trainer" ? navigate("/trainer/dashboard") : user?.role == "admin" ? navigate("/admin/dashboard") : null}
      </Sidebar>
      <Loader />
    </>
  )
}

export default App
