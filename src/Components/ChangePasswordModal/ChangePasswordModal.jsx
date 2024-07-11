import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { FaUserLock } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";

const ChangePasswordModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Change Password
            </Button>
            <Modal footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                <div className='p-5 px-2'>
                    <div>
                        <h1 className='text-lg text-center font-bold uppercase'>User Inforamtion</h1>
                    </div>

                    <div>
                        <div className='my-5 text-base'>

                            <label>Current Password</label>
                            <Input size="large" placeholder="Current Password" prefix={<FaUserLock />} className='mb-5' />

                            <label>New Password</label>
                            <Input size="large" type='password' placeholder="New Password" prefix={<RiLockPasswordFill />} className='mb-5' />

                            <label>Confirm Password</label>
                            <Input size="large" type='password' placeholder="Confirm Password" prefix={<RiLockPasswordFill />} className='mb-5' />

                        </div>
                    </div>

                    <div>
                        <Button type='primary' danger onClick={handleCancel}>Cancel</Button>
                        <Button type='primary' className='mx-2' onClick={handleOk}>Edit</Button>
                    </div>

                </div>

            </Modal>
        </>
    );
};
export default ChangePasswordModal;