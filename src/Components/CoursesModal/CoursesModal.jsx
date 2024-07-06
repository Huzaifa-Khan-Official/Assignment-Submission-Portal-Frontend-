import React, { useState } from 'react';
import { Modal, Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './CoursesModal.css';

const CoursesModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        console.log('Success:', values);
        setIsModalOpen(false);
        form.resetFields();
        // You can submit the form data here.
      })
      .catch(info => {
        console.log('Failed:', info);
      });
  };

  const handleUpload = ({ file, fileList }) => {
    // You can handle the upload here, e.g., upload the file to your server.
    console.log('Upload file:', file);
    console.log('Upload file list:', fileList);
  };

  const uploadProps = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts', // You can replace this with your server's URL.
    onChange(info) {
      if (info.file.status === 'uploading') {
        message.info('Uploading...');
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <Button type="primary" onClick={showModal} className="md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
        Create Course
      </Button>
      <Modal
        title="Create Course"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        footer={[
          <Button key="back" onClick={handleCancel} className="md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk} className="md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
            Create
          </Button>,
        ]}
        className="md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto p-4"
      >
        <Form form={form} layout="vertical" name="create-course-form" className="md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
          <Form.Item
            label="Course Name"
            name="courseName"
            rules={[{ required: true, message: 'Please enter course name!' }]}
          >
            <Input className="w-full p-2 pl-10 text-sm text-gray-700" />
          </Form.Item>
          <Form.Item
            label="Course Duration"
            name="courseDuration"
            rules={[{ required: true, message: 'Please enter course duration!' }]}
          >
            <Input type="number" className="w-full p-2 pl-10 text-sm text-gray-700" />
          </Form.Item>
          <Form.Item label="Course Image">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />} className="w-full p-2 pl-10 text-sm text-gray-700">
                Upload Image
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CoursesModal;