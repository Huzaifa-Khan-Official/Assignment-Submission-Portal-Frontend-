import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import CreateCourseForm from '../../Components/CreateCourseFormorm';

export default function AdminPanel() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Create Course
      </Button>
      <Modal
        title="Create Course"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <CreateCourseForm onClose={handleCancel} />
      </Modal>
    </div>
  );
}
