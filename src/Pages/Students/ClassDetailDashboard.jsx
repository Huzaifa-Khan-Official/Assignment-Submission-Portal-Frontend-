import { Button, Dropdown, Space } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import LoaderContext from '../../Context/LoaderContext';
import api from '../../api/api';
import ClassDetailPage from './ClassDetailPage';
import StudentAllAssignmentPage from './StudentAllAssignmentPage';
import AllClassfellowsPage from './AllClassfellowsPage';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { toast } from 'react-toastify';
import useFetchProfile from '../../utils/useFetchProfile';

function ClassDetailDashboard() {
    const { user, setUser } = useFetchProfile()
    const [selectedComponent, setSelectedComponent] = useState('Stream');
    const { classId } = useParams();
    const { loader, setLoader } = useContext(LoaderContext);
    const [detail, setDetail] = useState();
    const navigate = useNavigate();
    const studentId = localStorage.getItem('userId')
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

    const unEnrollFromClass = async () => {
        setLoader(true);
        try {
            const res = await api.delete(`api/classes/student/class/${classId}`);
            setLoader(false);
            toast.success(res.data.message, {
                onClose: () => {
                    navigate("/");
                }
            });
        } catch (error) {
            toast.error(error.res.data);
            setLoader(false);
        }
    }

    const items = [
        {
            label: <button onClick={() => unEnrollFromClass()}>Unenroll</button>,
            key: '0',
        },
    ];

    return (
        <div className='p-4 ps-6'>
            <header className="bg-teal-600 text-white p-4 rounded-lg mb-4">
                <h1 className="text-2xl">{detail?.name}</h1>
                <p className="text-md">{detail?.description}</p>
            </header>
            <div className='flex justify-between px-1 gap-3 items-center mb-5'>
                <div className="button-group flex gap-3 flex-wrap items-center">
                    <Button
                        onClick={() => setSelectedComponent('Stream')}
                        type={selectedComponent === 'Stream' ? 'primary' : undefined}
                    >
                        Stream
                    </Button>
                    <Button
                        onClick={() => setSelectedComponent('Classwork')}
                        type={selectedComponent === 'Classwork' ? 'primary' : undefined}
                    >
                        Classwork
                    </Button>
                    <Button
                        onClick={() => setSelectedComponent('People')}
                        type={selectedComponent === 'People' ? 'primary' : undefined}
                    >
                        People
                    </Button>
                    {
                        studentId && classId && (
                            <Button
                                onClick={() => navigate(`/student/${classId}/${studentId}/report`)}
                            >
                                View Report
                            </Button>
                        )
                    }

                </div>
                <div>
                    <Dropdown
                        menu={{
                            items,
                        }}
                        trigger={['click']}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <HiOutlineDotsVertical className='text-2xl' />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            </div>
            <div className="component-container">
                {renderComponent()}
            </div>
        </div>
    )
}

export default ClassDetailDashboard