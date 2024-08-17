import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import User from "../Context/Context";
import LoaderContext from "../Context/LoaderContext";
import api from "../api/api";
import { toast } from "react-toastify";

const useFetchProfile = () => {
  const { user, setUser } = useContext(User);
  const { setLoader } = useContext(LoaderContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoader(true);
        const res = await api.get("/api/users/profile");
        localStorage.setItem("userId", res.data._id);
        if (!res.data.isVerified) navigate("/account-verification")          
        setUser(res.data);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
      }
    };

    if (!user) {
      fetchProfile();
    }
  }, [setUser]);

  return { user, setUser };
};

export default useFetchProfile;
