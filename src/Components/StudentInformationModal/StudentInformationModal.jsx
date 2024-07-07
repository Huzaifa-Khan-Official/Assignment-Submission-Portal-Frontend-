import React, { useState } from 'react';
import { Modal, Form, Input, Select, Upload, Button, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {  Avatar  } from 'antd';

const { Option } = Select;

const StudentInformationModal = () => {
  const [visible, setVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleUploadChange = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setImageUrl(info.file.response.url);
    }
  };

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Add Student
      </Button>
      <Modal
        title="Student Information"
        visible={visible}
        onCancel={handleCancel}
        onOk={handleOk}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Number"
            name="number"
            rules={[{ required: true, message: 'Please enter your number!' }]}
          >
            <Input />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Batch"
                name="batch"
                rules={[{ required: true, message: 'Please select your batch!' }]}
              >
                <Select placeholder="Select a batch">
                  <Option value="Batch 10">Batch 10</Option>
                  <Option value="Batch 11">Batch 11</Option>
                  <Option value="Batch 12">Batch 12</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Course"
                name="course"
                rules={[{ required: true, message: 'Please select your course!' }]}
              >
                <Select placeholder="Select a course">
                  <Option value="Web Dev">Web Dev</Option>
                  <Option value="Data Science">Data Science</Option>
                  <Option value="Cyber Security">Cyber Security</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Profile Picture"
            name="profilePicture"
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e77"
              onChange={handleUploadChange}
            >
              {imageUrl ? (
                <Avatar size={64} src={imageUrl} />
              ) : (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentInformationModal;