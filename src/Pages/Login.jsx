import { Form, Input, Button } from "antd";
import animateLogin from "../assets/loginPagePic.png";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useContext, useEffect } from "react";
import User from "../Context/Context";
import LoaderContext from "../Context/LoaderContext";
import api from "../api/api";
import PageTitle from "../Components/PageTitle";
import Loader from "../Components/Loader";
import useFetchProfile from "../utils/useFetchProfile";

export default function Login() {
  const { user, setUser } = useFetchProfile();
  const { loader, setLoader } = useContext(LoaderContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.isVerified) {
      if (user.role == "admin") {
        navigate("/admin/dashboard");
      } else if (user.role == "trainer") {
        navigate("/trainer/dashboard");
      }
      else {
        navigate("/");
      }
    }
  }, [user]);

  const onFinish = async (data) => {
    setLoader(true);
    try {
      const res = await api.post("/api/users/auth", {
        email: data.email,
        password: data.password
      })

      setLoader(false);
      toast.success("Logged in successfully", {
        onClose: () => {
          localStorage.setItem('token', res.data.token);
          setUser(res.data);
          if (res.data.role == "admin") {
            navigate("/admin/dashboard");
          } else if (res.data.role == "trainer") {
            navigate("/trainer/dashboard");
          }
          else {
            navigate("/");
          }
        }
      })
    } catch (err) {
      setLoader(false);
      if (err.response?.data.message == "Please verify your email first!") {
        toast.error(err.response.data.message, {
          onClose: () => {
            localStorage.setItem('token', err.response.data.token);
            navigate("/account-verification")
          }
        })
      } else {
        toast.error(err.response?.data || "Something went wrong! Please try again.")
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.error("Please enter all fields")
  };

  return (
    <div className="flex justify-between min-h-screen">
      <ToastContainer autoClose={1000} />
      <Loader />
      <PageTitle title="Login" />
      <div className="md:w-1/2 flex justify-center items-center">
        <img src={animateLogin} alt="" className="w-full hidden md:block max-h-[400px] object-cover" />
      </div>
      <div className="w-full md:w-1/2 bg-primary-blue flex justify-center items-center">
        <div className="w-[80%]">
          <h1 className="text-4xl text-white font-bold text-center mb-7">Login</h1>
          <div className="w-full">
            <Form
              name="login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Email is required' },
                  { type: 'email', message: 'Enter a valid email address' },
                ]}
              >
                <Input placeholder="Enter Email" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Password is required' },
                  { min: 6, message: 'Password must be at least 6 characters long' },
                ]}
              >
                <Input.Password placeholder="Enter Password" />
              </Form.Item>

              <div className="mb-4">
                <p className="text-[#ffffff9d]">Don't have an account? <Link to="/signup" className="cursor-pointer opacity-1 text-white hover:underline">Sign up</Link></p>
              </div>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow">
                  <div className="absolute inset-0 w-0 bg-[#b3caff] transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                  <span className="relative text-primary-blue group-hover:text-blue-800 font-bold">Login</span>
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
};