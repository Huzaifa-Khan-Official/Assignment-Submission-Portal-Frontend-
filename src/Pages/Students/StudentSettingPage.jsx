import React, { useState } from 'react'
import { BellFilled } from '@ant-design/icons'
import { FaUserLock, FaBell } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { ImSearch } from "react-icons/im";
import { Button, Menu, Modal, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import { toast } from 'react-toastify';

const items = [
    {
        icon: <FaUserLock />,
        label: (<Link to="/student/profile">Update Profile</Link>),
    },
    {
        key: 'changePassword',
        label: 'Change password',
        icon: <FaUserLock />,
    },
];

export default function StudentSettingPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        setLoading(true);
        try {
            const values = await form.validateFields();
            const response = await api.put("/api/users/profile", {
                password: values.password,
                oldPassword: values.oldPassword
            })
            toast.success('Password updated successfully!', { duration: 3000 });
            setLoading(false);
            setIsModalOpen(false);
            form.resetFields();
        } catch (error) {
            console.log('Validation failed:', error);
            setLoading(false);
            toast.error(error.response.data.message, { duration: 3000 });
        }
    };
    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const onClick = (e) => {
        if (e.key === 'changePassword') {
            showModal(true);
        }
    };

    return (
        <div className='p-3 ps-5'>
            <div className='flex mt-3 text-2xl font-mono font-extrabold'>
                <h1 className='flex-1'>Settings</h1>
            </div>

            <Menu
                className='my-7 mt-3 rounded-lg w-full max-w-sm'
                mode="vertical"
                items={items}
                onClick={onClick}
            />

            <Modal
                title="Change Password"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="Cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        Submit
                    </Button>,
                ]}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="change_password"
                >
                    <Form.Item
                        name="oldPassword"
                        label="Old Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your old password!',
                            },
                        ]}
                    >
                        <Input.Password placeholder='Enter Old Password' />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your updated password!' },
                        { min: 6, message: 'Password must be at least 6 characters long' }
                        ]}
                        label="New Password"
                    >
                        <Input.Password placeholder="Enter New Password" className="w-full" />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        label="Confirm New Password"
                        hasFeedback
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Enter Confirm Password" className="w-full" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}