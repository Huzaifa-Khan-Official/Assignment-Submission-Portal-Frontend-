import React, { memo, useContext, useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { useDropzone } from 'react-dropzone';
import { BiSolidArrowToBottom } from "react-icons/bi";
import { toast } from 'react-toastify';
import useFetchProfile from '../../utils/useFetchProfile';
import uploadFileToFirebase from '../../utils/uploadFileToFirebase';
import LoaderContext from '../../Context/LoaderContext';
import api from '../../api/api';

const AssignmentSubmitFormModal = ({ showModal, setIsModalOpen, isModalOpen, handleCancel, handleSubmit, dropDownItem }) => {
    const { user, setUser } = useFetchProfile();
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [fileLink, setFileLink] = useState('');
    const { loader, setLoader } = useContext(LoaderContext);

    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleOk = async () => {
        setLoader(true);
        setIsModalOpen(false);
        if (!file && !fileLink) {
            toast.error("Please select a file or insert link!");
        } else {
            const assignmentData = {
                student: user._id,
                description,
                date: new Date(),
                fileLink
            };
            if (file) {
                // store the file in firebase storage
                const uploadedFileLink = await uploadFileToFirebase(
                    file,
                    `users/student/${user._id}/assignments/${file.name}`
                );
                assignmentData.fileLink = uploadedFileLink;
                handleSubmit(uploadedFileLink);
                console.log(assignmentData);
                // api integration for AssignmentData
            } else {
                assignmentData.fileLink = fileLink;

                console.log(assignmentData);
                // api integration for AssignmentData
            }

            setLoader(false);
            setFile(null);
            setFileLink("");
            setDescription("");
        }
    };

    return (
        <Modal footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} className='!z-[9]'>
            <div>
                <div>
                    <div className='my-5 text-base'>
                        <div>
                            <label>Assignment Description:</label>
                            <Input.TextArea
                                size="large"
                                placeholder="Write a description about your assignment"
                                className='my-2'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        {
                            dropDownItem == "link" ? (
                                <div>
                                    <label>File Link:</label>
                                    <Input
                                        size="large"
                                        placeholder="Paste the file link here"
                                        className='my-2'
                                        value={fileLink}
                                        onChange={(e) => setFileLink(e.target.value)}
                                    />
                                </div>
                            ) : (
                                <>
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
                                </>
                            )
                        }
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