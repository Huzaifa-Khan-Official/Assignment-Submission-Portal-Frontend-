import React, { useState } from 'react';
import {
  Layout,
  Menu,
  Row,
  Col,
  Button,
  Input,
  Modal,
  Form,
  message,
  Table,
} from 'antd';
import {
  HomeOutlined,
  BookOutlined,
  UserOutlined,
  TeamOutlined,
  SettingOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import smitlogo from './smitlogo.png';

const { Header, Sider, Content } = Layout;

const AllCourses = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: 'Web Development',
      description: 'Learn web development using modern frameworks.',
    },
    {
      id: 2,
      name: 'Python Development',
      description: 'Explore Python programming language and its applications.',
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCourse, setEditedCourse] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
    setIsEditing(false);
    setEditedCourse(null);
  };

  const showEditModal = (course) => {
    setIsModalVisible(true);
    setIsEditing(true);
    setEditedCourse(course);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddCourse = (values) => {
    const newCourse = {
      id: courses.length + 1,
      name: values.name,
      description: values.description,
    };
    setCourses([...courses, newCourse]);
    message.success('Course added successfully!');
    handleCancel();
  };

  const handleEditCourse = (values) => {
    const updatedCourses = courses.map((course) =>
      course.id === editedCourse.id
        ? { ...course, name: values.name, description: values.description }
        : course
    );
    setCourses(updatedCourses);
    message.success('Course updated successfully!');
    handleCancel();
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
    message.success('Course deleted successfully!');
  };

  const columns = [
    {
      title: 'Course Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div className='flex'>
          <Button
            type='primary'
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            type='primary'
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteCourse(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <Layout className='h-screen'>
      <Sider
        breakpoint='lg'
        collapsedWidth='0'
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        theme='dark'
      >
        <div className='flex justify-center p-4' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <img
    src={smitlogo}
    alt='SMIT Logo'
    style={{ width: 90, height: 90, borderRadius: '50%' }}
  />
</div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['2']}
          className='mt-8'
        >
          <Menu.Item key='1' icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key='2' icon={<BookOutlined />}>
            Courses
          </Menu.Item>
          <Menu.Item key='3' icon={<UserOutlined />}>
            Teacher
          </Menu.Item>
          <Menu.Item key='4' icon={<TeamOutlined />}>
            Student
          </Menu.Item>
          <Menu.Item key='5' icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className='bg-blue-500'>
          <Row justify='end' className='p-4'>
            <Col>
              <Button
                type='primary'
                icon={<PlusOutlined />}
                onClick={showModal}
                className='bg-green-500 hover:bg-green-700'
              >
               Add Course
              </Button>
            </Col>
          </Row>
        </Header>
        <Content className='bg-white' style={{ margin: '24px 16px 0' }}>
          <div className='p-4'>
            <h1 className='text-2xl font-bold mb-4'>All Courses</h1>
            <Table
              columns={columns}
              dataSource={courses}
              pagination={false}
              className='w-full'
            />
          </div>
        </Content>
      </Layout>
      <Modal
        title={isEditing? 'Edit Course' : 'Add Course'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key='submit'
            type='primary'
            form='courseForm'
            htmlType='submit'
          >
            {isEditing? 'Update' : 'Add'}
          </Button>,
        ]}
      >
        <Form
          id='courseForm'
          layout='vertical'
          onFinish={isEditing? handleEditCourse : handleAddCourse}
          initialValues={{
            name: editedCourse? editedCourse.name : '',
            description: editedCourse? editedCourse.description : '',
          }}
        >
          <Form.Item
            label='Course Name'
            name='name'
            rules={[{ required: true, message: 'Please enter course name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Description'
            name='description'
            rules={[{ required: true, message: 'Please enter course description!' }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default AllCourses;