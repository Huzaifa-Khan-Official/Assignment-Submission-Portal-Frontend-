import { Button } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import LoaderContext from '../../Context/LoaderContext';
import api from '../../api/api';
import ClassDetailPage from './ClassDetailPage';
import StudentAllAssignmentPage from './StudentAllAssignmentPage';
import AllClassfellowsPage from './AllClassfellowsPage';

function ClassDetailDashboard() {
    const [selectedComponent, setSelectedComponent] = useState('Stream');
    const { classId } = useParams();
    const { loader, setLoader } = useContext(LoaderContext);
    const [detail, setDetail] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getClassDetail();
    }, [])


    const getClassDetail = () => {
        setLoader(true);
        api.get(`/api/classes/student/class/${classId}`)
            .then(res => {
                setDetail(res.data);
                setLoader(false);
            })
            .catch(err => {
                toast.error(err.response.data);
                setLoader(false);
            });
    }

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'Stream':
                return <ClassDetailPage />;
            case 'Classwork':
                return <StudentAllAssignmentPage />;
            case 'People':
                return <AllClassfellowsPage />;
            default:
                return null;
        }
    };

    return (
        <div className='p-4 ps-6'>
            <header className="bg-teal-600 text-white p-4 rounded-lg mb-4">
                <h1 className="text-2xl">{detail?.name}</h1>
                <p className="text-md">{detail?.description}</p>
            </header>
            <div className="button-group mb-5">
                <Button
                    onClick={() => setSelectedComponent('Stream')}
                    type={selectedComponent === 'Stream' ? 'primary' : undefined}
                >
                    Stream
                </Button>
                <Button
                    onClick={() => setSelectedComponent('Classwork')}
                    type={selectedComponent === 'Classwork' ? 'primary' : undefined}
                    className='ml-4'
                >
                    Classwork
                </Button>
                <Button
                    onClick={() => setSelectedComponent('People')}
                    type={selectedComponent === 'People' ? 'primary' : undefined}
                    className='ml-4'
                >
                    People
                </Button>
            </div>
            <div className="component-container">
                {renderComponent()}
            </div>
        </div>
    )
}

export default ClassDetailDashboard