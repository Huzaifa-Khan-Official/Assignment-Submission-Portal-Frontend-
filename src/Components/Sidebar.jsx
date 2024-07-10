import { useState } from "react";
import smitlogo from '../assets/smitlogo.png'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HomeOutlined,
  BookOutlined,
  TeamOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import AdminPanel from "../Pages/AdminPanel";
import StudentHomePage from "../Pages/Students/StudentHomePage";
import StudentAllAssignmentPage from "../Pages/Students/StudentAllAssignmentPage";
import StudentAssignmentTodoPage from "../Pages/Students/StudentAssignmentTodoPage";
import AllClassfellowsPage from "../Pages/Students/AllClassfellowsPage";
import StudentSettingPage from "../Pages/Students/StudentSettingPage";
import NotificationModal from "./NotificationModal/NotificationModal";
import StudentUpdateProfilePage from "../Pages/Students/StudentUpdateProfilePage";

const { Header, Sider, Content } = Layout;

export default function Sidebar() {

  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: '0',
      icon: <UserOutlined />,
      label: 'Admin name',
    },
    {
      key: '1',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: '2',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      key: '3',
      icon: <UserOutlined />,
      label: 'Teacher',
    },
    {
      key: '4',
      icon: <TeamOutlined />,
      label: 'Student',
    },
    {
      key: '5',
      icon: <BookOutlined />,
      label: 'Courses',
    },
  ];

  return (
    <div>

      <Layout className="h-screen">

        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <img src={smitlogo} alt="logo" style={{ margin: "auto", width: "80px", height: "80px" }} />
          <hr />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} items={menuItems} />
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
          {/* admin content redering */}
          {/* <AdminPanel /> */}
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
  )
}