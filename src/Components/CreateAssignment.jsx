import { Modal, message, Upload, Form, Input, DatePicker } from 'antd';
import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

export default function CreateAssignment({ isModalOpen, setIsModalOpen }) {
    const [filePreview, setFilePreview] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();

    const handleFileChange = ({ file, fileList }) => {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (isLt2M) {
            if (file.status === 'removed') {
                setFilePreview(null);
            } else if (file.status === 'uploading' && file.originFileObj) {
                const previewUrl = URL.createObjectURL(file.originFileObj);
                setFilePreview(previewUrl);
            }

            setFileList(fileList);
        }

    };

    const beforeUpload = (file) => {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            toast.error('File must be smaller than 2MB!', { autoClose: 2000 });
        }
        return isLt2M;
    };

    const handleOk = () => {
        form.validateFields().then(values => {
            const file = fileList[0]?.originFileObj;
            if (file) {
                values.fileLink = file;
            }
            const formValues = { ...values };
            console.log('Form values:', formValues);
            setIsModalOpen(false);
            form.resetFields();
            setFileList([]);
            setFilePreview(null);
        }).catch(errorInfo => {
            console.log('Validation Failed:', errorInfo);
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        setFilePreview(null);
        setFileList([]);
    };

    return (
        <Modal
            title={<h3 className='text-2xl font-bold'>Create New Assignment</h3>}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <div className='flex flex-col gap-3' key={0}>
                    <button
                        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-3 bg-teal-500 hover:bg-teal-600 text-white"
                        type="submit"
                        onClick={handleOk}
                    >
                        Submit
                    </button>
                    <button
                        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 rounded-md px-3 bg-red-500 text-white"
                        type="button"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            ]}
        >
            <div className="flex flex-col space-y-1.5">
                <p className="text-sm text-muted-foreground">Fill out the form to create a new assignment.</p>
            </div>
            <div className="py-5">
                <Form
                    form={form}
                    className=""
                    layout="vertical"
                >
                    <Form.Item
                        name="title"
                        label="Title:"
                        rules={[{ required: true, message: 'Please enter the assignment title' }]}
                    >
                        <Input className='w-full p-2 text-sm text-gray-700' placeholder="Enter assignment title" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description:"
                        rules={[{ required: true, message: 'Please enter the assignment description' }]}
                    >
                        <Input.TextArea
                            className="w-full p-2 text-sm text-gray-700"
                            placeholder="Enter assignment description"
                            rows="3"
                        />
                    </Form.Item>
                    <Form.Item
                        name="dueDate"
                        label="Due Date:"
                        rules={[{ required: true, message: 'Please select the due date' }]}
                    >
                        <DatePicker
                            className="w-full p-2 px-3 text-gray-700"
                            placeholder="Select due date"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item
                        // name="fileLink"
                        label="File:"
                        rules={[{ required: true, message: 'Please upload a file' }]}
                    >
                        <Upload.Dragger
                            accept="*/*"
                            beforeUpload={beforeUpload}
                            onChange={handleFileChange}
                            fileList={fileList}
                            showUploadList={false}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                        </Upload.Dragger>
                        {filePreview && (
                            <div className="mt-2">
                                <p className="text-sm">File Preview:</p>
                                {filePreview.match(/.(jpeg|jpg|gif|png)$/i) ? (
                                    <img src={filePreview} alt="file preview" style={{ maxWidth: '100%' }} />
                                ) : (
                                    <a href={filePreview} target="_blank" rel="noopener noreferrer">View Uploaded File</a>
                                )}
                            </div>
                        )}
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
}
