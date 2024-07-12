import React, { useState } from 'react'
import { Button, Input, Modal } from 'antd';
import { LuFilePlus } from "react-icons/lu";
import { FiFolderPlus } from "react-icons/fi";
import { BiSolidArrowToBottom } from "react-icons/bi";

export default function AssignmentSubmitFormModal() {

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
        <div>
            <Button type="primary" onClick={showModal}>
                Assignment Submit
            </Button>
            <Modal footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                <div className='p1'>

                    <div>
                        <div className='my-5 text-base'>

                            <label>Assignment Description</label>
                            <Input.TextArea size="large" placeholder="Write a descripton about your assignment" className='my-2 mb-4' />
                            <label>Fill Submissions</label>
                            <div className='my-2 bg-stone-100 h-60 rounded-lg border-2'>
                                <div className='flex justify-center gap-10 text-4xl my-6'>
                                    <div className='border-2 border-dashed rounded-md border-sky-400 p-3 bg-stone-200 cursor-pointer'>
                                        <LuFilePlus className='transition ease-in-out delay-150 hover:scale-125' />
                                    </div>
                                    <div className='border-2 border-dashed rounded-md border-sky-400 p-3 bg-stone-200 cursor-pointer'>
                                        <FiFolderPlus className='transition ease-in-out delay-150 hover:scale-125' />
                                    </div>
                                </div>
                                <div className='mx-7 bg-stone-200 h-24 rounded-md border-2 border-dashed rounded-md border-sky-400'>
                                    <div className='my-2 flex justify-center text-4xl'>
                                        <BiSolidArrowToBottom className='transition ease-in-out delay-150 hover:scale-125 cursor-pointer' />
                                    </div>
                                    <div className='text-center text-xs'>
                                        <h1>You can drag and drop files here to add them.</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Button type='primary' danger onClick={handleCancel}>Cancel</Button>
                        <Button type='primary' className='mx-2' onClick={handleOk}>Submit</Button>
                    </div>

                </div>

            </Modal>
        </div>
    )
}