import { Input, Button, Checkbox, Form } from "antd";
import signupPagePic from "../assets/signupPagePic.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import User from "../Context/Context";
import LoaderContext from "../Context/LoaderContext";
import { toast, ToastContainer } from "react-toastify";
import api from "../api/api";
import PageTitle from "../Components/PageTitle";
import Loader from "../Components/Loader";

export default function Signup() {
  const { user, setUser } = useContext(User);
  const { loader, setLoader } = useContext(LoaderContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const onFinish = (values) => {
    setLoader(true);
    values.role = "student";
    api.post("/api/users", {
      username: values.username,
      email: values.email,
      password: values.password,
      role: values.role
    })
      .then((res) => {
        setLoader(false);
        toast.success("Sign up successfully", {
          onClose: () => {
            localStorage.setItem('token', res.data.token);
            setUser(res.data);
            navigate("/account-verification");
          }
        })
      })
      .catch(err => {
        setLoader(false);
        toast.error("Something went wrong, please try again!")
      });
  };

  const onFinishFailed = (errorInfo) => {
    toast.error("Please enter all required fields!");
  };

  return (
    <div className="flex justify-between min-h-screen">
      <ToastContainer autoClose={1000} />
      <Loader />
      <PageTitle title="Signup" />
      <div className="md:w-1/2 flex justify-center items-center">
        <img src={signupPagePic} alt="" className="w-full hidden md:block max-h-[400px] object-cover" />
      </div>
      <div className="w-full md:w-1/2 bg-primary-blue flex justify-center items-center">
        <div className="w-[80%]">
          <h1 className="text-4xl text-white font-bold text-center mb-7">Signup</h1>
          <h3 className="mb-4 text-white"><span className="font-bold">Note: </span>Ensure the email is correct and active, as it will be used for account verification.</h3>
          <Form
            name="signup"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input type="text" placeholder="Username" className="w-full" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'The input is not a valid email!' }
              ]}
            >
              <Input type="email" placeholder="Enter Email" className="w-full" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters long' }
              ]}
            >
              <Input.Password placeholder="Enter Password" className="w-full" />
            </Form.Item>
            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Enter Confirm Password" className="w-full" />
            </Form.Item>
            <div className="mb-4">
              <p className="text-[#ffffff9d]">Already have an account? <Link to="/login" className="cursor-pointer opacity-1 text-white hover:underline">Login</Link></p>
            </div>
            <div className="mb-8 flex justify-center mt-6">
              <Form.Item>
                <Button type="primary" htmlType="submit" className="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow">
                  <div className="absolute inset-0 w-0 bg-[#b3caff] transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                  <span className="relative text-primary-blue group-hover:text-blue-800 font-bold">Sign up</span>
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}