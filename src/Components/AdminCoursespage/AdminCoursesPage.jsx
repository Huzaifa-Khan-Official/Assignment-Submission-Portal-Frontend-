import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Row,
  Col,
  Button,
  Input,
  Form,
  Modal,
  Space,
  Table,
  Typography,
} from "antd";
import {
  HomeOutlined,
  UserOutlined,
  BookOutlined,
  SettingOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useLocalStorage } from "react-use";

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const AdminCoursesPage = () => {
  const [courses, setCourses] = useLocalStorage("courses", [
    {
      id: "1",
      name: "JavaScript",
      description: "This is a course on JavaScript",
    },
    {
      id: "2",
      name: "React",
      description: "This is a course on React",
    },
    {
      id: "3",
      name: "Node.js",
      description: "This is a course on Node.js",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [form] = Form.useForm(); // Use Ant Design form instance

  const handleAddCourse = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    setEditingCourse(null);
    form.resetFields(); // Reset form fields when adding new course
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSaveCourse = () => {
    form.validateFields().then((values) => {
      if (isEditing) {
        const updatedCourses = courses.map((course) =>
          course.id === editingCourse.id ? { ...course, ...values } : course
        );
        setCourses(updatedCourses);
        setIsEditing(false);
      } else {
        const newCourse = {
          id: Math.random().toString(36).substring(2, 15),
          ...values,
        };
        setCourses([...courses, newCourse]);
      }
      setIsModalOpen(false);
      form.resetFields(); // Reset form fields after saving
    });
  };

  const handleEditCourse = (record) => {
    setIsModalOpen(true);
    setIsEditing(true);
    setEditingCourse(record);
    form.setFieldsValue(record); // Set form fields when editing
  };

  const handleDeleteCourse = (record) => {
    const updatedCourses = courses.filter((course) => course.id !== record.id);
    setCourses(updatedCourses);
  };

  const columns = [
    {
      title: "Course Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEditCourse(record)}>
            <EditOutlined />
          </Button>
          <Button type="danger" onClick={() => handleDeleteCourse(record)}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    console.log("Courses updated:", courses);
  }, [courses]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        theme="dark"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          backgroundColor: "#0E4225", // Change sidebar background color
        }}
      >
        <div
          className="logo"
          style={{
            height: 32,
            margin: 16,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["3"]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Teachers
          </Menu.Item>
          <Menu.Item key="3" icon={<BookOutlined />}>
            Courses
          </Menu.Item>
          <Menu.Item key="4" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            backgroundColor: "#fff",
            borderBottom: "1px solid #ddd",
          }}
        >
          <Title level={3} style={{ color: "#333", padding: "0 16px" }}>
            Admin Courses Page
          </Title>
        </Header>
        <Content style={{ margin: "16px", overflow: "initial" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>Courses</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Row gutter={[16, 16]}>
              <Col span={18}>
                <Title level={3}>Courses</Title>
              </Col>
              <Col span={6} style={{ textAlign: "right" }}>
                <Button type="primary" onClick={handleAddCourse}>
                  <PlusOutlined /> Add Course
                </Button>
              </Col>
              <Col span={24}>
                <Table
                  dataSource={courses.map((course) => ({
                    ...course,
                    key: course.id,
                  }))}
                  columns={columns}
                  pagination={false}
                  style={{ marginTop: 16 }}
                />
              </Col>
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
      <Modal
        title={isEditing ? "Edit Course" : "Add New Course"}
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSaveCourse}>
            Save
          </Button>,
        ]}
      >
        <Form
          form={form}
          name="basic"
          autoComplete="off"
          initialValues={isEditing ? editingCourse : {}}
        >
          <Form.Item
            label="Course Name"
            name="name"
            rules={[
              { required: true, message: "Please enter course name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter description!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default AdminCoursesPage;
