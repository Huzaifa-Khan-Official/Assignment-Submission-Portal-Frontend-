import React, { useContext, useEffect, useState } from 'react';
import { Layout, Row, Col, Button, Input, Modal, Form, message, Table, } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, } from '@ant-design/icons';
import { VscOpenPreview } from 'react-icons/vsc';
import api from '../../api/api';
import { toast } from 'react-toastify';
import LoaderContext from '../../Context/LoaderContext';
import { useNavigate } from 'react-router';

const { Header, Content } = Layout;

const AllTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTeacher, setEditedTeacher] = useState(null);
  const { loader, setLoader } = useContext(LoaderContext);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    getAllTeachers();
  }, []);

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
    handleCancel();
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
        toast.success('Teacher added successfully!', {
          onClose: () => {
            getAllTeachers();
          }
        });
      })
      .catch(err => {
        setLoader(false);
        form.resetFields();
        toast.error(err.response?.data || err.message);
      });
  };

  const handleEditTeacher = (values) => {
    handleCancel();
    setLoader(true);
    api.put(`/api/users/trainer/${editedTeacher._id}`, {
      username: values.username,
      email: values.email,
    })
      .then((res) => {
        setLoader(false);
        toast.success('Teacher updated successfully!');
        getAllTeachers();
      })
      .catch(err => {
        setLoader(false);
        toast.error(err.response?.data || err.message);
      })
  };

  const onFinishFailed = (errorInfo) => {
    toast.error("Please enter all fields");
  };

  const handleDeleteTeacher = (id) => {
    setLoader(true);
    api.delete(`/api/users/trainer/${id}`)
      .then((res) => {
        setLoader(false);
        toast.success('Teacher deleted successfully!');
        getAllTeachers();
      })
      .catch(err => {
        setLoader(false);
        toast.error(err.response?.data || err.message);
      });
  };

  const getAllTeachers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/users/trainers");
      setTeachers(res.data);
      setLoading(false);
    } catch (error) {
      console.log("error ==>", error);
      setLoading(false);
      // toast.error(error.response?.data || error.message);
    }
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
            onClick={() => navigate(`/admin/trainer/${record._id}`)}
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
      <Content className='bg-white pb-4 rounded-sm' style={{ margin: '24px 0' }}>
        <div className='flex m-5 pt-5 text-2xl font-mono font-extrabold justify-between items-center flex-wrap gap-3'>
          <h1 className='text-2xl font-bold break-words'>All Teachers</h1>
          <button onClick={showModal} title='Add Teacher'>
            <PlusOutlined className='hover:bg-gray-200 rounded-full p-2' />
          </button>
        </div>
        <div className='px-3'>
          <Table
            columns={columns}
            dataSource={teachers}
            pagination={false}
            rowKey={(record) => record._id}
            className='min-w-full bg-white shadow-md rounded-lg overflow-x-auto'
            loading={loading}
          />
        </div>
      </Content>
      <Modal
        title={isEditing ? 'Edit Teacher' : 'Add Teacher'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <div className='flex justify-center xsm:justify-end gap-3 flex-wrap' key={0}>
            <Button key='back' onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              key='submit'
              type='primary'
              form='teacherForm'
              htmlType='submit'
            >
              {isEditing ? 'Update' : 'Add'}
            </Button>
          </div>
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