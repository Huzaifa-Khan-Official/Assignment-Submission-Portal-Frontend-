// import React, { memo, useState } from 'react'
// import { Button, Input, Modal } from 'antd';
// import { LuFilePlus } from "react-icons/lu";
// import { FiFolderPlus } from "react-icons/fi";
// import { BiSolidArrowToBottom } from "react-icons/bi";

// const AssignmentSubmitFormModal = ({ showModal, setIsModalOpen, isModalOpen, handleCancel }) => {
//     const handleOk = () => {
//         setIsModalOpen(false);
//     };

//     return (
//         <Modal footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
//             <div className='p1'>
//                 <div>
//                     <div className='my-5 text-base'>

//                         <label>Assignment Description</label>
//                         <Input.TextArea size="large" placeholder="Write a descripton about your assignment" className='my-2 mb-4' />
//                         <label>Fill Submissions</label>
//                         <div className='my-2 bg-stone-100 h-60 rounded-lg border-2'>
//                             <div className='flex justify-center gap-10 text-4xl my-6'>
//                                 <div className='border-2 border-dashed rounded-md border-sky-400 p-3 bg-stone-200 cursor-pointer'>
//                                     <LuFilePlus className='transition ease-in-out delay-150 hover:scale-125' />
//                                 </div>
//                                 <div className='border-2 border-dashed rounded-md border-sky-400 p-3 bg-stone-200 cursor-pointer'>
//                                     <FiFolderPlus className='transition ease-in-out delay-150 hover:scale-125' />
//                                 </div>
//                             </div>
//                             <div className='mx-7 bg-stone-200 h-24 rounded-md border-2 border-dashed border-sky-400 hover:cursor-pointer group'>
//                                 <div className='my-2 flex justify-center text-4xl'>
//                                     <BiSolidArrowToBottom className='transition ease-in-out delay-150 group-hover:scale-125 cursor-pointer' />
//                                 </div>
//                                 <div className='text-center text-xs'>
//                                     <h1>You can drag and drop files here to add them.</h1>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div>
//                     <Button type='primary' danger onClick={handleCancel}>Cancel</Button>
//                     <Button type='primary' className='mx-2' onClick={handleOk}>Submit</Button>
//                 </div>

//             </div>

//         </Modal>
//     )
// }

// export default memo(AssignmentSubmitFormModal);

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
                        <label>Assignment Description</label>
                        <Input.TextArea size="large" placeholder="Write a description about your assignment" className='my-2 mb-4' />
                        <label>File Submissions</label>
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