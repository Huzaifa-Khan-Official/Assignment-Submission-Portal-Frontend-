import { Input } from "antd";
import animateLogin from "../assets/loginPagePic.png";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex justify-between min-h-screen">
      <div className="md:w-1/2 flex justify-center items-center">
        <img src={animateLogin} alt="" className="w-full hidden md:block max-h-[400px] object-cover" />

      </div>
      <div className="w-full md:w-1/2 bg-primary-blue flex justify-center items-center">
        <div className="w-[80%]">
          <h1 className="text-4xl text-white font-bold text-center mb-7">Login</h1>
          <div className="w-full">
            <div className="mb-4">
              <Input type="email" placeholder="Enter Email" className="w-full" />
            </div>
            <div className="mb-4">
              <Input type="password" placeholder="Enter Password" className="w-full" />
            </div>
            <div className="mb-4">
              <p className="text-[#ffffff9d]">Don't have an account? <Link to="/signup" className="cursor-pointer opacity-1 text-white hover:underline">Signup</Link></p>
            </div>
            <div className="mb-8 flex justify-center mt-6">              
              <button className="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow">
                <div className="absolute inset-0 w-0 bg-[#b3caff] transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                <span className="relative text-primary-blue group-hover:text-blue-800 font-bold">Login</span>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
