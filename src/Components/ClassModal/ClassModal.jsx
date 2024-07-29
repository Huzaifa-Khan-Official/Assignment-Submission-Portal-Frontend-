import React, { memo, useContext, useState } from 'react';
import { Modal, Form, Input, Button, Upload, message, DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import api from '../../api/api';
import uploadFileToFirebase from '../../utils/uploadFileToFirebase';
import User from '../../Context/Context';
import { toast } from 'react-toastify';
import LoaderContext from '../../Context/LoaderContext';

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

const ClassModal = ({ isModalVisible, closeModal, getAllClasses }) => {
  const { user, setUser } = useContext(User);
  const [form] = Form.useForm();
  const { loader, setLoader } = useContext(LoaderContext);

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
      .then(async (values) => {
        closeModal();
        setLoader(true);
        form.resetFields();
        setImageUrl();
        const file = values.classImage.file.originFileObj;
        const fileURL = await uploadFileToFirebase(file, `classes/${user._id}/${file.name}`);
        values.classImage = fileURL;

        api.post('/api/classes/create', values)
          .then(res => {
            getAllClasses();
            setLoader(false);
            toast.success('Class created successfully!');
          })
          .catch(err => {
            throw new Error('Failed to create class.');
          });
      })
      .catch(info => {
        setLoader(false);
        toast.error(info?.message);
      });
  };


  return (
    <Modal
      title="Create Class"
      open={isModalVisible}
      onCancel={handleCancel}
      onOk={handleOk}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Create
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="create-course-form">
        <Form.Item
          label="Class Name:"
          name="name"
          rules={[{ required: true, message: 'Please enter course name!' }]}
        >
          <Input className="w-full p-2 text-sm text-gray-700" />
        </Form.Item>
        <Form.Item
          label="Class Description:"
          name="description"
          rules={[{ required: true, message: 'Please enter class description!' }]}
        >
          <Input className="w-full p-2 text-sm text-gray-700" />
        </Form.Item>
        <Form.Item label="Class Image" name="classImage">
          <Upload
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
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default memo(ClassModal);