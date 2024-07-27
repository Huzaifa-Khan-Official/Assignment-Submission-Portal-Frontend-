import React, { memo, useState } from 'react';
import { Modal, Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const getBase64 = (img, callback) => {
  console.log("img ==>", img);
  // const reader = new FileReader();
  // reader.addEventListener('load', () => callback(reader.result));
  // reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const ClassModal = ({ isModalVisible, closeModal }) => {
  const [form] = Form.useForm();

  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.originFileObj) {
      const imageUrl = URL.createObjectURL(info.file.originFileObj);
      setImageUrl(imageUrl);
      setLoading(false);
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const handleCancel = () => {
    closeModal();
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        console.log('Success:', values);
        closeModal();
        form.resetFields();
        // You can submit the form data here.
      })
      .catch(info => {
        console.log('Failed:', info);
      });
  };


  return (
    <Modal
      title="Create Course"
      open={isModalVisible}
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
        <Upload
          name="avatar"
          listType="picture-circle"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="avatar"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </Form>
    </Modal>
  );
};

export default memo(ClassModal);