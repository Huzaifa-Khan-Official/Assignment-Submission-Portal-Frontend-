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
      <div className="admin-dashboard">
        <div className="button-group ml-8 mt-8">
          <Button
            onClick={() => setSelectedComponent('AllTeachers')}
            type={selectedComponent === 'AllTeachers' ? 'primary' : undefined}
          >
            All Teachers
          </Button>
          <Button
            onClick={() => setSelectedComponent('AllStudents')}
            type={selectedComponent === 'AllStudents' ? 'primary' : undefined}
            className='ml-4'
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
