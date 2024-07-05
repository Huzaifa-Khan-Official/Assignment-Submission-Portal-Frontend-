import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HomeOutlined,
  BookOutlined,
  TeamOutlined,
  SettingOutlined,
  PlusOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Input, Upload, message } from "antd";
import "./Coursescreatemodel.css";
import smitlogo from './smitlogo.png'

const { Header, Sider, Content } = Layout;



const Coursescreatemodel = () => {
    const [collapsed, setCollapsed] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      message.loading({ content: "Uploading...", key: "upload" });
    }
    if (info.file.status === "done") {
      message.success({ content: "Uploaded successfully", key: "upload" });
      setImageUrl(info.file.response.url);
    } else if (info.file.status === "error") {
      message.error({ content: "Upload failed", key: "upload" });
    }
  };
  const uploadButton = (
    <div>
      <Upload
        name="image"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e77"
        onChange={handleChange}
      >
        {imageUrl? (
          <img src={imageUrl} alt="course" style={{ width: "100%" }} />
        ) : (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
    </div>
  );

  return (
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
        <div className="logo">
          <img src={smitlogo} alt="logo" />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="0">
            <UserOutlined />
            <span>Admin name</span>
          </Menu.Item>
          <Menu.Item key="1">
            <HomeOutlined />
            <span>Home</span>
          </Menu.Item>
          <Menu.Item key="2">
            <SettingOutlined />
            <span>Settings</span>
          </Menu.Item>
          <Menu.Item key="3">
            <UserOutlined />
            <span>Teacher</span>
          </Menu.Item>
          <Menu.Item key="4">
            <TeamOutlined    />
            <span>Student</span>
          </Menu.Item>
          <Menu.Item key="5">
            <BookOutlined />
            <span>Courses</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {collapsed? (
            <MenuUnfoldOutlined
              className="trigger"
              onClick={() => setCollapsed(!collapsed)}
            />
          ) : (
            <MenuFoldOutlined
              className="trigger"
              onClick={() => setCollapsed(!collapsed)}
            />
          )}
          <div className="page-title">
            <h1>Courses</h1>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <form className="form max-w-md mx-auto">
            <div className="form-group">
              <label htmlFor="course-name">Course Name:</label>
              <Input
                id="course-name"
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Enter Course Name"
                className="w-full"
              />
            </div>
            <div className="form-group">
              <label htmlFor="course-duration">Course Duration:</label>
              <Input
                id="course-duration"
                type="text"
                value={courseDuration}
                onChange={(e) => setCourseDuration(e.target.value)}
                placeholder="Enter Course Duration"
                className="w-full"
              />
            </div>
            <div className="form-group">
              <label htmlFor="course-image">Course Image:</label>
              {uploadButton}
            </div>
            <div className="form-group">
              <Button type="primary" htmlType="submit">
                Create
              </Button>
              <Button type="secondary" htmlType="reset">
                Cancel
              </Button>
            </div>
          </form>
        </Content>
      </Layout>
    </Layout>
  );
};  
  export default Coursescreatemodel;