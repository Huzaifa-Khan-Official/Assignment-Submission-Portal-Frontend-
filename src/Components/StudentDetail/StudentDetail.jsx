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

    console.log("Student ==>", student);
    return (
        <div>
            <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-background rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-5 bg-muted">
                        <h1 className="text-2xl font-bold"><ArrowLeftOutlined className='hover:bg-gray-300 p-2 rounded-full' title='Back to Previous' onClick={() => navigate(-1)} /> Student Details</h1>
                    </div>
                    <div className="px-6 py-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h2 className="text-lg font-semibold">Name</h2>
                                <p>{student?.username}</p>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">Student Email</h2>
                                <p>{student?.email}</p>
                            </div>
                        </div>
                        <div className="my-6 border-2" />
                        <h2 className="text-lg font-semibold">Enrolled Classes</h2>
                        <div className="grid gap-6">
                            {
                                student ? student.classes.map(cls => (
                                    <Card key={cls._id}>
                                        <div className="flex justify-between">
                                            <h1 className='text-2xl font-bold'>{cls.name}</h1>
                                            <ArrowRightOutlined className='hover:bg-gray-300 p-2 rounded-full' title='See Detial!' />
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-muted-foreground">Professor:</span>
                                                <span>{cls.teacher?.username}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-muted-foreground">Email:</span>
                                                <span>{cls.teacher?.email}</span>
                                            </div>
                                        </div>
                                    </Card>
                                )) :
                                    <Card loading={loader}></Card>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentDetail