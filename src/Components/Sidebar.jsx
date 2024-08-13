import { useContext, useState, useEffect, memo } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, HomeOutlined, BookOutlined, TeamOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { SiGoogleclassroom } from "react-icons/si";
import { Layout, Menu } from "antd";
import { VscChecklist } from "react-icons/vsc";
import smitlogo from '../assets/smitlogo.png';
import User from "../Context/Context";
import LoaderContext from "../Context/LoaderContext";
import api from "../api/api";
import { toast, ToastContainer } from "react-toastify";
import Loader from "./Loader";
import PageTitle from "./PageTitle";
import useFetchProfile from "../utils/useFetchProfile";

const { Header, Sider, Content } = Layout;

const Sidebar = ({ children, title }) => {
  const { user, setUser } = useFetchProfile();
  const { loader, setLoader } = useContext(LoaderContext);
  const [collapsed, setCollapsed] = useState(false);
  const [isLgOrHigher, setIsLgOrHigher] = useState(window.innerWidth >= 1024);
  const navigate = useNavigate();
  const location = useLocation();
  const [homeKey, setHomeKey] = useState({ key: '1', icon: <HomeOutlined />, label: <Link to="/">Home</Link> });
  const [updatedKey, setUpdatedKey] = useState({ key: '0', icon: <UserOutlined />, label: (<Link to="/student/profile" className="capitalize">Profile</Link>) });
  const [settingsKey, setSettingsKey] = useState(
    { key: '2', icon: <SettingOutlined />, label: (<Link to="/settings">Settings</Link>), },
  )


  useEffect(() => {
    const handleResize = () => {
      setIsLgOrHigher(window.innerWidth >= 991);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (user?.role) {
      setHomeKey({
        key: '1',
        icon: <HomeOutlined />,
        label:
          user.role === 'admin' ? (
            <Link to="/admin/dashboard">Home</Link>
          ) : user.role === 'trainer' ? (
            <Link to="/trainer/dashboard">Home</Link>
          ) : (
            <Link to="/">Home</Link>
          ),
      });

      setUpdatedKey({
        key: '0',
        icon: <UserOutlined />,
        label:
          user.role === 'admin' ? (
            <Link to="/admin/profile" className="capitalize">Profile</Link>
          ) : user.role === 'trainer' ? (
            <Link to="/trainer/profile" className="capitalize">Profile</Link>
          ) : (
            <Link to="/student/profile" className="capitalize">Profile</Link>
          ),
      });
      setSettingsKey({
        key: user.role === "admin" ? "4" : "2",
        icon: <SettingOutlined />,
        label:
          user.role === "admin" ? (
            <Link to="/admin/settings">Settings</Link>
          ) : user.role === "trainer" ? (
            <Link to="/trainer/settings">Settings</Link>
          ) : (
            <Link to="/settings">Settings</Link>
          ),
      });
    }
  }, [user]);


  const adminMenuItems = [
    updatedKey,
    homeKey,
    { key: '2', icon: <UserOutlined />, label: (<Link to="/admin/teachers">Teachers</Link>) },
    { key: '3', icon: <TeamOutlined />, label: (<Link to="/admin/students">Students</Link>) },
    settingsKey
  ];

  const trainerMenuItems = [
    updatedKey,
    homeKey,
    settingsKey
  ];

  const studentMenuItems = [
    updatedKey,
    homeKey,
    settingsKey
  ];

  const getMenuItemKey = () => {
    // admin routes
    if (location.pathname.includes("/admin/profile")) return '0';
    if (location.pathname.includes("/admin/dashboard")) return '1';
    if (location.pathname.includes("/admin/teachers")) return '2';
    if (location.pathname.includes("/admin/trainer")) return '2';
    if (location.pathname.includes("/admin/assignments/:teacherID")) return '2';
    if (location.pathname.includes("/admin/students")) return '3';
    if (location.pathname.includes("/admin/student")) return '3';
    if (location.pathname.includes("/admin/settings")) return '4';
    // student routes
    if (location.pathname.includes("/student/profile")) return '0';
    if (location.pathname === "/") return '1';
    if (location.pathname.includes("/student/class")) return '1';
    if (location.pathname.includes("/settings")) return '2';

    // trainer routes
    if (location.pathname.includes("/trainer/profile")) return '0';
    if (location.pathname.includes("/trainer/dashboard")) return '1';
    if (location.pathname.includes("/trainer/class")) return '1';
    if (location.pathname.includes("/trainer/settings")) return '2';
  };

  const handleBreakpoint = (broken) => {
    if (broken) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };

  const logoutBtn = () => {
    setLoader(true);
    api.post("/api/users/logout")
      .then(res => {
        setLoader(false);
        toast.success(res.data, {
          onClose: () => {
            localStorage.removeItem('token');
            setUser(null);
            navigate("/login");
          }
        });
      })
      .catch(err => {
        setLoader(false);
        toast.error(err.response?.data || err.message, {
          autoClose: false
        });
      });
  };

  return (
    <div>
      <Layout className="min-h-screen">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="lg"
          collapsedWidth="80"
          onBreakpoint={handleBreakpoint}
          style={{
            overflowY: 'hidden',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 10
          }}
        >
          <img src={smitlogo} alt="logo" style={{ margin: "auto", width: collapsed ? "50px" : "80px", height: collapsed ? "50px" : "80px" }} />
          <hr />
          <div className="flex w-full px-2 flex-col justify-between h-[80%]">
            <Menu
              theme="dark"
              mode="vertical"
              style={{ height: "100%", width: "100%" }}
              items={user?.role === "trainer" ? trainerMenuItems : user?.role === "admin" ? adminMenuItems : studentMenuItems}
              selectedKeys={[getMenuItemKey()]}
            />
            <div className="flex items-center justify-center lg:justify-start px-4 py-2 hover:bg-[#1677ff] rounded-md transition duration-500 cursor-pointer" onClick={logoutBtn}>
              <LogoutOutlined className="text-white text-lg" />
              {!collapsed && <button className="ml-3 text-white">Logout</button>}
            </div>
          </div>
        </Sider>
        <Layout className={`site-layout lg:ml-[200px] ${collapsed && "lg:ml-0"}`}>
          <div className={`bg-[#f5f5f5] pb-10 ${collapsed && "ml-[70px]"} overflow-hidden`}>
            <PageTitle title={title} />
            {children}
            <ToastContainer autoClose={1000} />
            <Loader />
          </div>
        </Layout>
      </Layout>
    </div>
  );
}

export default memo(Sidebar);