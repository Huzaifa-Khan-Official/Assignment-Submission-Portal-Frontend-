import { Button } from 'antd';
import React, { useState } from 'react'

function TrainerClassDetailPage() {
    const [selectedComponent, setSelectedComponent] = useState('Overview');

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'Overview':
                return ("Overview");
            case 'AllStudents':
                return ("All Students");
            default:
                return null;
        }
    };
    return (
        <div className='p-5'>
            <h1 className='text-3xl font-bold break-words'>
                Class Details:
            </h1>
            <div className="button-group flex gap-3 flex-wrap mt-4">
                <Button
                    onClick={() => setSelectedComponent('Overview')}
                    type={selectedComponent === 'Overview' ? 'primary' : undefined}
                >
                    Overview
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
    )
}

export default TrainerClassDetailPage