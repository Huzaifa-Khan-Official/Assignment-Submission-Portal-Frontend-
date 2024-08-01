import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import LoaderContext from '../../Context/LoaderContext';
import api from '../../api/api';

function StudentAssignmentDetailPage() {
    const { classId, assignmentId } = useParams();
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

    return (
        <div className='max-w-4xl p-4 ps-5'>
            <header className="bg-teal-600 text-white p-4 rounded-lg mb-4">
                <h1 className="text-2xl">{detail?.name}</h1>
                <p className="text-md">{detail?.description}</p>
            </header>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-2'>
                <section>
                    <div className="bg-gray-100 rounded-lg ps-2">
                        <h2 className="text-xl mb-4">Upcoming</h2>
                        <div className='bg-white p-4 rounded-lg shadow mb-4'>
                            <p>Woohoo, no work due soon!</p>
                        </div>
                    </div>
                </section>

                <section className="ms-1 col-span-2">
                    <h1>Student submitted assignment</h1>
                </section>
            </div>
        </div>
    )
}

export default StudentAssignmentDetailPage