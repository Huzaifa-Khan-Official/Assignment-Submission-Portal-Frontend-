import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import api from '../../api/api';
import LoaderContext from '../../Context/LoaderContext';
import { toast } from 'react-toastify';
import { Card } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

function StudentDetail() {
    const { studentId } = useParams();
    const { loader, setLoader } = useContext(LoaderContext);
    const [student, setStudent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getStudentDetail();
    }, []);

    const getStudentDetail = () => {
        setLoader(true);
        api.get(`/api/users/student/${studentId}`)
            .then(res => {
                setLoader(false);
                setStudent(res.data);
            })
            .catch(err => {
                setLoader(false);
                toast.error(err?.response.data.message, {
                    onClose: () => {
                        navigate(-1);
                    }
                });
            })
    }

    return (
        <div className='ms-3'>
            <div className='max-w-2xl mx-auto px-3 mt-3'>
                <div className="bg-background rounded-lg shadow-md overflow-hidden border-t-2">
                    <div className="px-3 py-5 bg-muted">
                        <h1 className="text-2xl font-bold break-words"><ArrowLeftOutlined className='hover:bg-gray-300 p-2 rounded-full' title='Back to Previous' onClick={() => navigate(-1)} /> Student Details</h1>
                    </div>
                    <div className="px-3 py-5 pt-0">
                        <div className="flex justify-between gap-4 px-3 flex-wrap">
                            <div>
                                <p>Name:</p>
                                <h2 className="text-lg font-semibold capitalize">{student?.username}</h2>
                            </div>
                            <div>
                                <p>Student Email:</p>
                                <h2 className="text-lg font-semibold">{student?.email}</h2>
                            </div>
                        </div>
                        <div className="my-6 border-2" />
                        <h2 className="text-lg font-semibold mb-3">Enrolled Classes</h2>
                        <div className="flex flex-col gap-3">
                            {
                                loader ? <Card loading={loader}></Card> :
                                    student?.classes.length > 0 ? student.classes.map(cls => (
                                        <Card key={cls._id} styles={{ body: { padding: "10px 15px" } }}>
                                            <div className="flex justify-between items-center">
                                                <h1 className='text-2xl font-bold'>{cls.name}</h1>
                                                <ArrowRightOutlined className='hover:bg-gray-300 p-2 rounded-full h-fit' title='See Detail!' onClick={() => navigate(cls._id)} />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center justify-between flex-wrap gap-2">
                                                    <span className="text-muted-foreground">Trainer:</span>
                                                    <span className='font-bold'>{cls.teacher?.username}</span>
                                                </div>
                                                <div className="flex items-center justify-between flex-wrap gap-2">
                                                    <span className="text-muted-foreground">Email:</span>
                                                    <span className='font-bold break-all'>{cls.teacher?.email}</span>
                                                </div>
                                            </div>
                                        </Card>
                                    )) :
                                        (<h1>Student is not enrolled in any class!</h1>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentDetail