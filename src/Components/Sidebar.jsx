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

const { Header, Sider, Content } = Layout;

const Sidebar = ({ children, title }) => {
  const { user, setUser } = useContext(User);
  const { loader, setLoader } = useContext(LoaderContext);
  const [collapsed, setCollapsed] = useState(false);
  const [isLgOrHigher, setIsLgOrHigher] = useState(window.innerWidth >= 1024);
  const navigate = useNavigate();
  const location = useLocation();

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
  }, [user, setUser, navigate]);

  useEffect(() => {
    const handleResize = () => {
      setIsLgOrHigher(window.innerWidth >= 991);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const adminMenuItems = [
    { key: '0', icon: <UserOutlined />, label: user?.username, className: "capitalize" },
    { key: '1', icon: <HomeOutlined />, label: (<Link to="/">Home</Link>), },
    {
      key: 'sub1', label: (<Link to="/teachers">Teachers</Link>), icon: <UserOutlined />, children: [
        { key: '5', icon: <BookOutlined />, label: (<Link to="/teachers/assignments">Assignments</Link>), },
        { key: '6', icon: <TeamOutlined />, label: (<Link to="/teachers/students">Students</Link>), }
      ],
    },
    { key: '3', icon: <TeamOutlined />, label: 'Students', },
    { key: '4', icon: <SettingOutlined />, label: 'Settings', },
  ];

  const trainerMenuItems = [
    { key: '0', icon: <UserOutlined />, label: user?.username, className: "capitalize" },
    { key: '1', icon: <HomeOutlined />, label: (<Link to="/trainer/dashboard">Home</Link>), },
    { key: '2', icon: <SiGoogleclassroom />, label: (<Link to="/classes">Classes</Link>), },
    { key: '3', icon: <BookOutlined />, label: (<Link to="/assignments">Assignments</Link>), },
    { key: '4', icon: <TeamOutlined />, label: (<Link to="/students">Students</Link>), },
    { key: '5', icon: <SettingOutlined />, label: (<Link to="/settings">Settings</Link>), },
  ];

  const studentMenuItems = [
    { key: '0', icon: <UserOutlined />, label: (<Link to="/student/profile">{user?.username}</Link>), className: "capitalize" },
    { key: '1', icon: <HomeOutlined />, label: (<Link to="/">Home</Link>), },
    { key: "2", icon: <BookOutlined />, label: (<Link to="/student/assignments">Assignments</Link>) },
    { key: "3", icon: <VscChecklist />, label: (<Link to="/assignments/todo">To-do</Link>) },
    { key: '4', icon: <TeamOutlined />, label: (<Link to="/classmates">Classmates</Link>), },
    { key: '5', icon: <SettingOutlined />, label: (<Link to="/settings">Settings</Link>), },
  ];

  const getMenuItemKey = () => {
    // student routes
    if (location.pathname.includes("/student/profile")) return '0';
    if (location.pathname === "/") return '1';
    if (location.pathname.includes("/student/assignment")) return '2';
    if (location.pathname.includes("/assignments/todo")) return '3';
    if (location.pathname.includes("/classmates")) return '4';
    if (location.pathname.includes("/settings")) return '5';

    if (location.pathname.includes("/trainer/dashboard")) return '1';
    if (location.pathname.includes("/students")) return '4';
    // Add more checks as needed
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
      <Layout className="h-screen">
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
          {/* <Header
            className="site-layout-background bg-white"
            style={{
              paddingLeft: 20,
            }}
          >
            {!isLgOrHigher && (
              collapsed ? (
                <MenuUnfoldOutlined
                  className="trigger ml-[80px] text-2xl"
                  onClick={() => setCollapsed(!collapsed)}
                />
              ) : (
                <MenuFoldOutlined
                  className="trigger m-5 ml-[200px] lg:ml-0 text-2xl"
                  onClick={() => setCollapsed(!collapsed)}
                />
              )
            )}
          </Header> */}
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