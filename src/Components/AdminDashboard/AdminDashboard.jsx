import React, { useState } from 'react';
import AllTeachers from '../AllTeachers/AllTeachers';
import AllStudents from '../AllStudents/AllStudents';
import { Button } from 'antd';

const AdminDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('AllTeachers');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'AllTeachers':
        return <AllTeachers />;
      case 'AllStudents':
        return <AllStudents />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="admin-dashboard my-3 mx-5 me-3">
        <h1 className='text-3xl font-bold break-words'>
          Admin Dashboard
        </h1>
        <div className="button-group flex gap-3 flex-wrap mt-4">
          <Button
            onClick={() => setSelectedComponent('AllTeachers')}
            type={selectedComponent === 'AllTeachers' ? 'primary' : undefined}
          >
            All Teachers
          </Button>
          <Button
            onClick={() => setSelectedComponent('AllStudents')}
            type={selectedComponent === 'AllStudents' ? 'primary' : undefined}
          >
            All Students
          </Button>
        </div>
        <div className="component-container">
          {renderComponent()}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
