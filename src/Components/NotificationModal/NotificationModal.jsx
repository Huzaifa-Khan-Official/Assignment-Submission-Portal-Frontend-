import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import { memo } from 'react';

const NotificationModal = ({ visible, handleCancel }) => {
    return (
        <div>
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

export default memo(NotificationModal);