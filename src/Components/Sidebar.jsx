import { useContext, useState, useEffect } from "react";
import smitlogo from '../assets/smitlogo.png';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HomeOutlined,
  BookOutlined,
  TeamOutlined,
  SettingOutlined,
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
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

export default function Sidebar() {
  const { user, setUser } = useContext(User);

  console.log(user);

  const [collapsed, setCollapsed] = useState(false);

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
      label: 'Home',
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: (<Link to="/teachers">Teachers</Link>),
      type: 'group',
      children: [
        { key: "1", label: (<Link to="/teachers/assignments">Assignments</Link>) },
        { key: "2", label: (<Link to="/teachers/students">Students</Link>) },
      ]
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

  const handleBreakpoint = (broken) => {
    if (broken) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
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
        >
          <img src={smitlogo} alt="logo" style={{ margin: "auto", width: "80px", height: "80px" }} />
          <hr />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} items={user?.role == "trainer" ? trainerMenuItems : adminMenuItems} />
        </Sider>
        <Layout className="site-layout">
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
                className="trigger m-5"
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
          <NotificationModal />
          <StudentUpdateProfilePage />
          {/* end admin content redering */}

        </Layout>
      </Layout>
    </div>
  );
}