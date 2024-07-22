import React, { useContext, useEffect, useState } from 'react';
import { Layout, Row, Col, Button, Input, Modal, Form, message, Table, } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, } from '@ant-design/icons';
import { VscOpenPreview } from 'react-icons/vsc';
import api from '../../api/api';
import { toast } from 'react-toastify';
import LoaderContext from '../../Context/LoaderContext';

const { Header, Content } = Layout;

const AllTeachers = () => {
  const storedTeachers = localStorage.getItem('teachers');
  const [teachers, setTeachers] = useState(storedTeachers ? JSON.parse(storedTeachers) : []);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTeacher, setEditedTeacher] = useState(null);
  const { loader, setLoader } = useContext(LoaderContext);
  const [form] = Form.useForm();

  useEffect(() => {
    if (teachers.length === 0) {
      getAllTeachers();
    }
  }, [teachers]);

  useEffect(() => {
    if (isModalVisible) {
      if (isEditing && editedTeacher) {
        form.setFieldsValue({
          username: editedTeacher.username,
          email: editedTeacher.email,
          password: '',
        });
      } else {
        form.resetFields();
      }
    }
  }, [isModalVisible, isEditing, editedTeacher, form]);

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

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleAddTeacher = (values) => {
    setLoader(true);
    api.post("/api/users/trainer", {
      username: values.username,
      email: values.email,
      password: values.password,
      role: "trainer"
    })
      .then((res) => {
        setLoader(false);
        form.resetFields();
        handleCancel();
        toast.success('Teacher added successfully!', {
          onClose: () => {
            getAllTeachers();
          }
        });
      })
      .catch(err => {
        setLoader(false);
        toast.error(err.response?.data || err.message);
      });
  };

  const handleEditTeacher = (values) => {
    const updatedTeachers = teachers.map((teacher) =>
      teacher.id === editedTeacher.id
        ? { ...teacher, username: values.username, email: values.email }
        : teacher
    );
    setTeachers(updatedTeachers);
    message.success('Teacher updated successfully!');
    handleCancel();
  };

  const onFinishFailed = (errorInfo) => {
    toast.error("Please enter all fields");
  };

  const handleDeleteTeacher = (id) => {
    setTeachers(teachers.filter((teacher) => teacher.id !== id));
    message.success('Teacher deleted successfully!');
  };

  const getAllTeachers = () => {
    api.get("/api/users/trainers")
      .then(res => {
        setTeachers(res.data);
        localStorage.setItem("teachers", JSON.stringify(res.data));
      })
      .catch(err => {
        toast.error(err?.response.data);
      });
  };

  const columns = [
    {
      title: 'Teacher Name',
      dataIndex: 'username',
      key: 'username',
      render: (text) => <a className="block w-max">{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <a className="block w-max">{text}</a>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div className='flex gap-4'>
          <Button
            type='primary'
            icon={<VscOpenPreview />}
            onClick={() => handleDeleteTeacher(record._id)}
            title='View Details'
          />
          <Button
            type='primary'
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
            className='bg-[#22c55e] hover:bg-[#22994d]'
            title='Edit Teacher'
          />
          <Button
            type='primary'
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteTeacher(record._id)}
            title='Delete Teacher'
          />
        </div>
      ),
    },
  ];

  return (
    <>
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
              rowKey={(record) => record._id}
              className='min-w-full bg-white shadow-md rounded-lg overflow-x-scroll sm:overflow-x-hidden'
            />
          </div>
        </Content>
      </Layout>
      <Modal
        title={isEditing ? 'Edit Teacher' : 'Add Teacher'}
        open={isModalVisible}
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
            {isEditing ? 'Update' : 'Add'}
          </Button>,
        ]}
      >
        <Form
          form={form}
          id='teacherForm'
          layout='vertical'
          onFinish={isEditing ? handleEditTeacher : handleAddTeacher}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label='Teacher Name'
            name='username'
            rules={[{ required: true, message: 'Please enter teacher name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              { required: true, message: 'Please enter teacher email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input />
          </Form.Item>
          {!isEditing && (
            <Form.Item
              label='Password'
              name='password'
              rules={[{ required: true, message: 'Please enter teacher password!' }]}
            >
              <Input.Password />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default AllTeachers;