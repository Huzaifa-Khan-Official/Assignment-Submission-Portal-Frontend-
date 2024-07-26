import React, { useCallback, useContext, useState } from 'react'
import { BellFilled, UserOutlined } from '@ant-design/icons'
import { MdOutlineMail, MdOutlinePhoneEnabled } from "react-icons/md";
import { Button, Input } from 'antd';
import NotificationModal from '../../Components/NotificationModal/NotificationModal';
import User from '../../Context/Context';
import userIcon from "../../assets/userIcon.png";

export default function StudentUpdateProfilePage() {
    const { user, setUser } = useContext(User);
    const [visible, setVisible] = useState(false);
    let [ProfileImg, setProfileImg] = useState("");
    let [ImgFiles, setImgFiles] = useState([]);


    const handleNotification = useCallback(() => {
        setVisible(true);
    }, []);

    const handleCancel = useCallback(() => {
        setVisible(false);
    }, []);

    const ProfileImgIcon = (e) => {
        setProfileImg(URL.createObjectURL(e.target.files[0]));
        setImgFiles(e.target.files[0])
    }

    return (
        <div className='max-w-[700px]'>
            <div className='flex m-5 text-2xl font-mono font-extrabold mx-8'>
                <h1 className='flex-1'>Update Profile</h1>
                <BellFilled className='flex-2 text-amber-400 hover:text-amber-500 transition delay-100 cursor-pointer' onClick={handleNotification} />
            </div>

            <div className='bg-white mx-5 p-4 sm:p-7 rounded-lg shadow-lg shadow-slate-300'>
                <div>
                    <h1 className='text-lg font-bold uppercase break-all'>User Inforamtion</h1>
                </div>

                <div className='flex justify-evenly items-center gap-4 flex-col-reverse sm:flex-row py-5'>
                    <div className='text-base'>
                        <label>Username</label>
                        <Input size="large" value={user?.username} placeholder="username" prefix={<UserOutlined />} className='mb-5' />

                        <label>Email</label>
                        <Input size="large" value={user?.email} type='email' placeholder="email" prefix={<MdOutlineMail />} className='mb-5' />
                    </div>

                    <div className='flex flex-col items-center'>
                        {ProfileImg ? (
                            <img className='w-24 h-24 object-contain bg-stone-200 rounded-full mx-5' src={ProfileImg} alt="#" />
                        ) : (
                            <img className='w-24 h-24 object-contain rounded-full mx-5' src={userIcon} alt="#" />
                        )}
                        <input type="file" hidden id="changeImg" onChange={(e) => ProfileImgIcon(e)} />
                        <Button className='my-3' type='primary' ghost><label className='cursor-pointer' htmlFor="changeImg">Change image</label></Button>
                    </div>
                </div>

                <div className='mx-2 flex flex-col-reverse items-center gap-4 sm:flex-row'>
                    <Button type='primary' className='w-fit' danger>Cancel</Button>
                    <Button type='primary' className='w-fit'>Save Changes</Button>
                </div>

            </div>

            <NotificationModal visible={visible} handleCancel={handleCancel} />
        </div>
    )
}