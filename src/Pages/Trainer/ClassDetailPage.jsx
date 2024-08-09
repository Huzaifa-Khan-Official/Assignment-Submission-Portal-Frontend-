import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import api from '../../api/api';
import LoaderContext from '../../Context/LoaderContext';
import { toast } from 'react-toastify';

const ClassDetailPage = () => {
    const { classId } = useParams();
    const { loader, setLoader } = useContext(LoaderContext);
    const [detail, setDetail] = useState();
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState([])

    useEffect(() => {
        getClassDetail();
    }, [])


    const getClassDetail = async () => {
        setLoader(true);
        try {
            const res = await api.get(`/api/classes/trainer/class/${classId}`);
            const response = await api.get(`/api/assignments/class/${classId}`)
            setAssignments(response.data)
            setDetail(res.data);
            setLoader(false);

        } catch (error) {
            toast.error(error.response.data, {
                onClose: () => {
                    navigate("/trainer/dashboard");
                }
            })
            setLoader(false);
        }
    }

    const announcements = [
        {
            name: 'Shahmeer Hanif',
            date: 'Mar 4',
            content: 'https://drive.google.com/drive/folders/1zTv6xmBOCbkx2JRm8BV-hFXBzdkfPfMU',
            files: []
        },
        {
            name: 'Shahmeer Hanif',
            date: 'Mar 3',
            content: 'ShahmeerHanif/55/CPP',
            files: [
                { name: 'Binary File', type: 'binary' },
                { name: 'Unknown File', type: 'unknown' },
            ]
        }
    ];

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-2'>
                <section className="">
                    <div className="bg-gray-100 rounded-lg ps-2">
                        <h2 className="text-xl mb-3">Class code</h2>
                        <div className='bg-white p-4 rounded-lg shadow mb-3'>
                            <p>{detail?.join_code}</p>
                        </div>
                    </div>
                    <div className="bg-gray-100 rounded-lg ps-2">
                        <h2 className="text-xl mb-3">Upcoming</h2>
                        <div className='bg-white p-4 rounded-lg shadow mb-3'>
                            <p>Woohoo, no work due soon!</p>
                        </div>
                    </div>
                </section>

                <section className="ms-1 col-span-2">
                    <h2 className="text-xl mb-4">Stream</h2>
                    {announcements == 0 ? <div className='bg-white p-4 rounded-lg shadow mb-4'>
                        <h1>No Announcement Yet!</h1>
                    </div> : announcements.map((announcement, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow mb-4">
                            <div className="flex items-center mb-2">
                                <div className="bg-gray-300 h-10 w-10 rounded-full flex items-center justify-center mr-2">
                                    <span className="text-lg font-bold">{announcement.name[0]}</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">{announcement.name}</h3>
                                    <p className="text-gray-600">{announcement.date}</p>
                                </div>
                            </div>
                            <p className="text-blue-500 mb-2 hover:cursor-pointer break-all">{announcement.content}</p>
                            <div className="flex flex-wrap">
                                {announcement.files.map((file, idx) => (
                                    <div key={idx} className="bg-gray-200 p-2 rounded-lg m-1">
                                        {file.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <section>
                        <h2 className="text-xl mb-4 ms-1">Assignments</h2>
                        {assignments.length > 0 ? assignments.map((assignment, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow mb-4 hover:shadow-md hover:-translate-y-1 hover:cursor-pointer" onClick={() => navigate(`/trainer/class/${classId}/${assignment._id}`)}>
                                <h3 className="text-lg font-bold">{assignment.title}</h3>
                                <p className="text-gray-600">Due date: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                            </div>
                        )) : (
                            <div>
                                <p>No assignments</p>
                            </div>
                        )}
                    </section>
                </section>

            </div>
        </div >
    );
};

export default ClassDetailPage;