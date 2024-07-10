import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

const NotificationModal = () => {
    const [visible, setVisible] = useState(false);

    const handleNotification = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <div>
            <Button type="primary" onClick={handleNotification}>
                Show Notification
            </Button>
            <Modal
                width={350}
                style={{
                    position: 'absolute',
                    right: 50,
                    textAlign: 'center',
                    padding: 0
                }}
                title="Notification"
                open={visible}
                onCancel={handleCancel}
                footer={[

                ]}
            >
                <div className='flex justify-around mb-1'>
                    <p>Notification message goes here!</p>
                    <CloseCircleFilled className='text-red-500 cursor-pointer' />
                </div>
                <div className='flex justify-around mb-1'>
                    <p>Notification message goes here!</p>
                    <CloseCircleFilled className='text-red-500 cursor-pointer' />
                </div>
                <div className='flex justify-around mb-1'>
                    <p>Notification message goes here!</p>
                    <CloseCircleFilled className='text-red-500 cursor-pointer' />
                </div>
                <div className='flex justify-around mb-1'>
                    <p>Notification message goes here!</p>
                    <CloseCircleFilled className='text-red-500 cursor-pointer' />
                </div>
                <div className='flex justify-around mb-1'>
                    <p>Notification message goes here!</p>
                    <CloseCircleFilled className='text-red-500 cursor-pointer' />
                </div>

            </Modal>
        </div>
    );
};

export default NotificationModal;