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
                setUser(res.data);
                setLoader(false);
            } catch (error) {
                setLoader(false);
                console.error("Error fetching profile:", error.response?.data || error.message);
                localStorage.removeItem('token');
                setUser(null);
                navigate("/login");
            }
        };

        if (!user) {
            fetchProfile();
        }
    }, [user, setUser, navigate, setLoader]);

    return { user, setUser };
};

export default useFetchProfile;