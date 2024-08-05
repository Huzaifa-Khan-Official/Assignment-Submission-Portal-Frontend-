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
                // More files...
            ]
        }
        // Add more announcements here...
    ];

    const assignments = [
        { name: 'Assignment 3', date: 'Feb 27' },
        { name: 'Course Books/Materials', date: 'Feb 27' },
        { name: 'Assignment 2', date: 'Feb 12' },
        { name: 'Course Outline', date: 'Feb 6' },
        { name: 'Assignment 01', date: 'Feb 5' }
        // Add more assignments here...
    ];

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-2'>
                <section className="">
                    <div className="bg-gray-100 rounded-lg ps-2">
                        <h2 className="text-xl mb-4">Upcoming</h2>
                        <div className='bg-white p-4 rounded-lg shadow mb-4'>
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
                            <p className="text-blue-500 mb-2 hover:cursor-pointer">{announcement.content}</p>
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
                        {assignments.map((assignment, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow mb-4 hover:shadow-md hover:-translate-y-1 hover:cursor-pointer" onClick={() => navigate(`${index}`)}>
                                <h3 className="text-lg font-bold">{assignment.name}</h3>
                                <p className="text-gray-600">{assignment.date}</p>
                            </div>
                        ))}
                    </section>
                </section>

            </div>
        </div>
    );
};

export default ClassDetailPage;