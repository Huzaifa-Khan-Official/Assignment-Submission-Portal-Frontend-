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

const AllTeachers = () => {
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: 'Jamsheed khan',
      designation: 'Frontend Developer',
    },
    {
      id: 2,
      name: 'Huzaifa Khan',
      designation: 'Backend Developer',
    },
    {
      id: 2,
      name: 'Muhammad Noman ',
      designation: 'Frontend Developer',
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTeacher, setEditedTeacher] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
    setIsEditing(false);
    setEditedTeacher(null);
  };

  const showEditModal = (teacher) => {
    setIsModalVisible(true);
    setIsEditing(true);
    setEditedTeacher(teacher);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddTeacher = (values) => {
    const newTeacher = {
      id: teachers.length + 1,
      name: values.name,
      designation: values.designation,
    };
    setTeachers([...teachers, newTeacher]);
    message.success('Teacher added successfully!');
    handleCancel();
  };

  const handleEditTeacher = (values) => {
    const updatedTeachers = teachers.map((teacher) =>
      teacher.id === editedTeacher.id
       ? {...teacher, name: values.name, designation: values.designation }
        : teacher
    );
    setTeachers(updatedTeachers);
    message.success('Teacher updated successfully!');
    handleCancel();
  };

  const handleDeleteTeacher = (id) => {
    setTeachers(teachers.filter((teacher) => teacher.id!== id));
    message.success('Teacher deleted successfully!');
  };

  const columns = [
    {
      title: 'Teacher Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
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
            onClick={() => handleDeleteTeacher(record.id)}
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
          defaultSelectedKeys={['3']}
          className='mt-8'
        >
          <Menu.Item key='1' icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key='2' icon={<BookOutlined />}>
            Courses
          </Menu.Item>
          <Menu.Item key='3' icon={<UserOutlined />}>
            Teachers
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
                Add Teacher
              </Button>
            </Col>
          </Row>
        </Header>
        <Content className='bg-white' style={{ margin: '24px 16px 0' }}>
          <div className='p-4'>
            <h1 className='text-2xl font-bold mb-4'>All Teachers</h1>
            <Table
              columns={columns}
              dataSource={teachers}
              pagination={false}
              className='w-full'
            />
          </div>
        </Content>
      </Layout>
      <Modal
        title={isEditing? 'Edit Teacher' : 'Add Teacher'}
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
            form='teacherForm'
            htmlType='submit'
          >
            {isEditing? 'Update' : 'Add'}
          </Button>,
        ]}
      >
        <Form
          id='teacherForm'
          layout='vertical'
          onFinish={isEditing? handleEditTeacher : handleAddTeacher}
          initialValues={{
            name: editedTeacher? editedTeacher.name : '',
            designation: editedTeacher? editedTeacher.designation : '',
          }}
        >
          <Form.Item
            label='Teacher Name'
            name='name'
            rules={[{ required: true, message: 'Please enter teacher name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Designation'
            name='designation'
            rules={[{ required: true, message: 'Please enter teacher designation!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default AllTeachers;