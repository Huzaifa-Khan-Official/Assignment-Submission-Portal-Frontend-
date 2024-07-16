import { useContext, useState, useEffect, memo } from "react";
import smitlogo from '../assets/smitlogo.png';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HomeOutlined,
  BookOutlined,
  TeamOutlined,
  SettingOutlined,
  AppstoreOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { SiGoogleclassroom } from "react-icons/si";
import { Layout, Menu } from "antd";
import AdminPanel from "../Pages/AdminPanel";
import StudentHomePage from "../Pages/Students/StudentHomePage";
import StudentAllAssignmentPage from "../Pages/Students/StudentAllAssignmentPage";
import StudentAssignmentTodoPage from "../Pages/Students/StudentAssignmentTodoPage";
import AllClassfellowsPage from "../Pages/Students/AllClassfellowsPage";
import StudentSettingPage from "../Pages/Students/StudentSettingPage";
import NotificationModal from "./NotificationModal/NotificationModal";
import StudentUpdateProfilePage from "../Pages/Students/StudentUpdateProfilePage";
import User from "../Context/Context";
import LoaderContext from "../Context/LoaderContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { VscChecklist } from "react-icons/vsc";
import api from "../api/api";
import { toast, ToastContainer } from "react-toastify";
import Loader from "./Loader";
import PageTitle from "./PageTitle"

const { Header, Sider, Content } = Layout;

const Sidebar = ({ children, title }) => {
  const { user, setUser } = useContext(User);
  const { loader, setLoader } = useContext(LoaderContext);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoader(true);
        const res = await api.get("/api/users/profile");
        console.log("fetched data from db")
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

  const adminMenuItems = [
    {
      key: '0',
      icon: <UserOutlined />,
      label: user?.username,
      className: "capitalize"
    },
    {
      key: '1',
      icon: <HomeOutlined />,
      label: (<Link to="/">Home</Link>),
    },
    {
      key: 'sub2',
      label: (<Link to="/teachers">Teachers</Link>),
      icon: <UserOutlined />,
      children: [
        {
          key: '5',
          icon: <BookOutlined />,
          label: (<Link to="/teachers/assignments">Assignments</Link>),
        },
        {
          key: '6',
          icon: <TeamOutlined />,
          label: (<Link to="/teachers/students">Students</Link>),
        }
      ],
    },
    {
      key: '3',
      icon: <TeamOutlined />,
      label: 'Students',
    },
    {
      key: '4',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  const trainerMenuItems = [
    {
      key: '0',
      icon: <UserOutlined />,
      label: user?.username,
      className: "capitalize"
    },
    {
      key: '1',
      icon: <HomeOutlined />,
      label: (<Link to="/">Home</Link>),
    },
    {
      key: '2',
      icon: <SiGoogleclassroom />,
      label: (<Link to="/classes">Classes</Link>),
    },
    {
      key: '3',
      icon: <BookOutlined />,
      label: (<Link to="/assignments">Assignments</Link>),
    },
    {
      key: '4',
      icon: <TeamOutlined />,
      label: (<Link to="/students">Students</Link>),
    },
    {
      key: '2',
      icon: <SettingOutlined />,
      label: (<Link to="/settings">Settings</Link>),
    },

  ];

  const studentMenuItems = [
    {
      key: '0',
      icon: <UserOutlined />,
      label: user?.username,
      className: "capitalize"
    },
    {
      key: '1',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: "2",
      icon: <BookOutlined />,
      label: (<Link to="/student/assignments">Assignments</Link>)
    },
    {
      key: "3",
      icon: <VscChecklist />,
      label: (<Link to="/assignments/todo">To-do</Link>)
    },
    {
      key: '4',
      icon: <TeamOutlined />,
      label: (<Link to="classmates">Classmates</Link>),
    },
    {
      key: '5',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  const handleBreakpoint = (broken) => {
    if (broken) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };

  const logoutBtn = () => {
    api.post("/api/users/logout")
      .then(res => {
        toast.success(res.data, {
          onClose: () => {
            localStorage.removeItem('token');
            setUser(null);
            navigate("/login");
          }
        });
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <Layout className="h-screen">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={handleBreakpoint}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
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
          <img src={smitlogo} alt="logo" style={{ margin: "auto", width: "80px", height: "80px" }} />
          <hr />
          <div className="flex w-full px-2 flex-col justify-between h-[80%]">
            <Menu theme="dark" mode="vertical" style={{ height: "100%", width: "100%" }} defaultSelectedKeys={["1"]} items={user?.role == "trainer" ? trainerMenuItems : user?.role == "admin" ? adminMenuItems : studentMenuItems} />
            <div className="flex items-center px-4 py-2 hover:bg-[#1677ff] rounded-md transition duration-500 cursor-pointer" onClick={logoutBtn}><LogoutOutlined className="text-white text-lg" /><button className="ml-3 text-white">Logout</button></div>
          </div>
        </Sider>
        <Layout className={`site-layout lg:ml-[200px] ${collapsed && "lg:ml-0"}`}>
          <Header
            className="site-layout-background bg-white"
            style={{
              padding: 0,
            }}
          >
            {collapsed ? (
              <MenuUnfoldOutlined
                className="trigger mx-5"
                onClick={() => setCollapsed(!collapsed)}
              />
            ) : (
              <MenuFoldOutlined
                className="trigger m-5 ml-[200px] lg:ml-0"
                onClick={() => setCollapsed(!collapsed)}
              />
            )}
          </Header>
          {/* admin content rendering */}
          {/* <StudentHomePage /> */}
          {/* <StudentAllAssignmentPage /> */}
          {/* <StudentAssignmentTodoPage /> */}
          {/* <AllClassfellowsPage /> */}
          {/* <StudentSettingPage /> */}
          {/* <NotificationModal />
          <StudentUpdateProfilePage /> */}
          <div className="bg-[#f5f5f5] pb-10">
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