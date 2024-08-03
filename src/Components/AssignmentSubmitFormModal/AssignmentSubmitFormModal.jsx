import React, { memo, useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { useDropzone } from 'react-dropzone';
import { LuFilePlus } from "react-icons/lu";
import { FiFolderPlus } from "react-icons/fi";
import { BiSolidArrowToBottom } from "react-icons/bi";

const AssignmentSubmitFormModal = ({ showModal, setIsModalOpen, isModalOpen, handleCancel }) => {
    const [file, setFile] = useState(null);

    const onDrop = (acceptedFiles) => {
        console.log(acceptedFiles[0]);
        setFile(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleOk = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div>
                <div>
                    <div className='my-5 text-base'>
                        <div>
                            <label>Assignment Description:</label>
                            <Input.TextArea size="large" placeholder="Write a description about your assignment" className='my-2' />
                        </div>
                        <div>
                            <label>File Link:</label>
                            <Input size="large" placeholder="Paste the file link here" className='my-2' />
                        </div>
                        <label>File Submission:</label>
                        <div className='my-2 bg-stone-100 h-60 rounded-lg border-2 flex  justify-center items-center'>
                            <div {...getRootProps({ className: 'bg-stone-200 rounded-md border-2 border-dashed border-sky-400 hover:cursor-pointer group p-5' })}>
                                <input {...getInputProps()} />
                                {
                                    file ? (
                                        <div className='flex justify-center items-center h-full'>
                                            <h3>
                                                {file.name} ({file.size} bytes)
                                            </h3>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className='flex justify-center text-4xl'>
                                                <BiSolidArrowToBottom className='transition ease-in-out delay-150 group-hover:scale-125 cursor-pointer' />
                                            </div>
                                            <div className='text-center text-xs'>
                                                <h1>Choose a file or drag and drop files here to add them.</h1>
                                            </div>
                                        </div>

                                    )
                                }
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
    )
}

export default memo(AssignmentSubmitFormModal);