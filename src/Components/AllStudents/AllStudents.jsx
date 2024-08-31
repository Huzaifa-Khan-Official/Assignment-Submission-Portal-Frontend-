import React, { useContext, useEffect, useState } from 'react';
import { Layout, Row, Col, Button, Input, Modal, Form, message, Table, } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, } from '@ant-design/icons';
import { VscOpenPreview } from 'react-icons/vsc';
import api from '../../api/api';
import { toast } from 'react-toastify';
import LoaderContext from '../../Context/LoaderContext';
import { useNavigate } from 'react-router';

const { Header, Content } = Layout;

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState(null);
  const { loader, setLoader } = useContext(LoaderContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (students.length === 0) {
      getAllStudents();
    }
  }, [students]);

  useEffect(() => {
    if (isModalVisible) {
      if (isEditing && editedStudent) {
        form.setFieldsValue({
          username: editedStudent.username,
          email: editedStudent.email,
          password: '',
        });
      } else {
        form.resetFields();
      }
    }
  }, [isModalVisible, isEditing, editedStudent, form]);

  const showModal = () => {
    setIsModalVisible(true);
    setIsEditing(false);
    setEditedStudent(null);
  };

  const showEditModal = (student) => {
    setIsModalVisible(true);
    setIsEditing(true);
    setEditedStudent(student);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleAddStudent = (values) => {
    handleCancel();
    setLoader(true);
    api.post("/api/users/student", {
      username: values.username,
      email: values.email,
      password: values.password,
      role: "student"
    })
      .then((res) => {
        setLoader(false);
        form.resetFields();
        toast.success('Student added successfully!', {
          onClose: () => {
            getAllStudents();
          }
        });
      })
      .catch(err => {
        setLoader(false);
        form.resetFields();
        toast.error(err.response?.data || err.message);
      });
  };

  const handleEditStudent = (values) => {
    handleCancel();
    setLoader(true);
    api.put(`/api/users/student/${editedStudent._id}`, {
      username: values.username,
      email: values.email,
    })
      .then((res) => {
        setLoader(false);
        toast.success('Student updated successfully!');
        getAllStudents();
      })
      .catch(err => {
        setLoader(false);
        toast.error(err.response?.data || err.message);
      })
  };

  const onFinishFailed = (errorInfo) => {
    toast.error("Please enter all fields");
  };

  const handleDeleteStudent = (id) => {
    setLoader(true);
    api.delete(`/api/users/student/${id}`)
      .then((res) => {
        setLoader(false);
        toast.success('Student deleted successfully!');
        getAllStudents();
      })
      .catch(err => {
        setLoader(false);
        toast.error(err.response?.data || err.message);
      });
  };

  const getAllStudents = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/users/students");
      setLoading(false);
      setStudents(res.data);
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data || err.message);
    }
  };

  const columns = [
    {
      title: 'Student Name',
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
      title: "Is Verified",
      dataIndex: "isVerified",
      key: 'isVerified',
      render: (text) => <span className={`w-full flex justify-center items-center p-1 rounded-lg text-white bg-${text ? 'green' : 'red'}-500 text-sm`}>{text ? 'Yes' : 'No'}</span>,
    },
    {
      title: 'No. of enrolled classes',
      dataIndex: 'classes',
      key: 'classes',
      filters: [
        { text: '0 classes', value: 0 },
        { text: '1-3 classes', value: [1, 2, 3] },
        { text: '4+ classes', value: 4 },
      ],
      onFilter: (value, record) => {
        const classCount = record.classes ? record.classes.length : 0;
        if (Array.isArray(value)) {
          return value.includes(classCount);
        }
        return value === 4 ? classCount >= 4 : classCount === value;
      },
      sorter: (a, b) => (a.classes ? a.classes.length : 0) - (b.classes ? b.classes.length : 0),
      render: (classes) => <span className="block w-max">{classes ? classes.length : 0}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div className='flex gap-4'>
          <Button
            type='primary'
            icon={<VscOpenPreview />}
            onClick={() => navigate(`/admin/student/${record._id}`)}
            title='View Details'
          />
          <Button
            type='primary'
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
            className='bg-[#22c55e] hover:bg-[#22994d]'
            title='Edit Student'
          />
          <Button
            type='primary'
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteStudent(record._id)}
            title='Delete Student'
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Content className='bg-white  pb-4 rounded-sm' style={{ margin: '24px 0' }}>
        <div className='flex m-5 pt-5 text-2xl font-mono font-extrabold justify-between items-center flex-wrap gap-3'>
          <h1 className='text-2xl font-bold'>All Students</h1>
          <button onClick={showModal} title='Add Student'>
            <PlusOutlined className='hover:bg-gray-200 rounded-full p-2' />
          </button>
        </div>
        <div className='px-3'>
          <Table
            columns={columns}
            dataSource={students}
            pagination={false}
            rowKey={(record) => record._id}
            className='min-w-full bg-white shadow-md rounded-lg overflow-x-auto'
            loading={loading}
          />
        </div>
      </Content>
      <Modal
        title={isEditing ? 'Edit Student' : 'Add Student'}
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
              form='studentForm'
              htmlType='submit'
            >
              {isEditing ? 'Update' : 'Add'}
            </Button>
          </div>
        ]}
      >
        <Form
          form={form}
          id='studentForm'
          layout='vertical'
          onFinish={isEditing ? handleEditStudent : handleAddStudent}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label='Student Name'
            name='username'
            rules={[{ required: true, message: 'Please enter Student name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              { required: true, message: 'Please enter student email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input />
          </Form.Item>
          {!isEditing && (
            <Form.Item
              label='Password'
              name='password'
              rules={[{ required: true, message: 'Please enter student password!' }]}
            >
              <Input.Password />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default AllStudents;