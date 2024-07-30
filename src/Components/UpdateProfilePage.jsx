import React, { useCallback, useContext, useEffect, useState } from 'react';
import { BellFilled, LoadingOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { MdOutlineMail } from "react-icons/md";
import { Button, Form, Input, message, Upload } from 'antd';
import userIcon from "../assets/userIcon.png";
import User from '../Context/Context';
import LoaderContext from '../Context/LoaderContext';
import api from '../api/api';
import { toast } from 'react-toastify';
import uploadFileToFirebase from '../utils/uploadFileToFirebase';

export default function UpdateProfilePage() {
    const { user, setUser } = useContext(User);
    const [visible, setVisible] = useState(false);
    const { loader, setLoader } = useContext(LoaderContext);
    const [form] = Form.useForm();
    const [profileImg, setProfileImg] = useState(user?.profileImg || userIcon);
    const [loading, setLoading] = useState(false);


    const handleNotification = useCallback(() => {
        setVisible(true);
    }, []);

    const handleCancel = useCallback(() => {
        setVisible(false);
    }, []);

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.originFileObj) {
            const imageUrl = URL.createObjectURL(info.file.originFileObj);
            setProfileImg(imageUrl);
            setLoading(false);
        }
    };

    const onFinish = async (values) => {
        setLoader(true);
        try {
            if (values.profileImg.file.originFileObj) {
                const file = values.profileImg?.file.originFileObj;
                const fileURL = await uploadFileToFirebase(file, `users/trainer/${user._id}/${file.name}`);
                values.profileImg = fileURL;
            }

            const res = await api.put("/api/users/profile", {
                username: values.username,
                email: values.email,
                profileImg: values.profileImg
            })
            setUser(res.data);
            setLoader(false);
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.log("error ==>", error);
            setLoader(false);
            toast.error(error);
        }
    };

    console.log(user);

    return (
        <div className='max-w-[700px]'>
            <div className='flex m-5 text-2xl font-mono font-extrabold mx-8'>
                <h1 className='flex-1'>Update Profile</h1>
                <BellFilled className='flex-2 text-amber-400 hover:text-amber-500 transition delay-100 cursor-pointer' onClick={handleNotification} />
            </div>

            <div className='bg-white mx-5 p-4 sm:p-7 rounded-lg shadow-lg shadow-slate-300'>
                <div>
                    <h1 className='text-lg font-bold uppercase break-all'>User Information</h1>
                </div>

                <Form form={form} onFinish={onFinish} initialValues={user} layout="vertical">
                    <div className='flex justify-evenly items-center gap-4 flex-col-reverse sm:flex-row py-5'>
                        <div className='text-base w-full'>
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please enter your username!' }]}
                            >
                                <Input size="large" placeholder="Username" prefix={<UserOutlined />} className='mb-5' />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
                            >
                                <Input size="large" placeholder="Email" prefix={<MdOutlineMail />} className='mb-5' />
                            </Form.Item>
                        </div>

                        <div className='flex flex-col items-center'>
                            {
                                profileImg ? (
                                    <img className='w-24 h-24 object-contain rounded-full mx-5' src={profileImg} alt="Profile" />
                                ) : user ? (
                                    <img className='w-24 h-24 object-contain bg-stone-200 rounded-full mx-5' src={user.profileImg} alt="Profile" />
                                ) : (
                                    <img className='w-24 h-24 object-contain rounded-full mx-5' src={userIcon} alt="Profile" />
                                )
                            }
                            <Form.Item name="profileImg">
                                <Upload
                                    className="avatar-uploader"
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                    showUploadList={false}
                                >
                                    <Button className='my-3' type='primary' ghost>
                                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                        <label className='cursor-pointer'>Change image</label>
                                    </Button>
                                </Upload>
                            </Form.Item>
                        </div>
                    </div>

                    <div className='mx-2 flex flex-col-reverse items-center gap-4 sm:flex-row'>
                        <Button type='primary' htmlType="submit" className='w-fit'>Save Changes</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}