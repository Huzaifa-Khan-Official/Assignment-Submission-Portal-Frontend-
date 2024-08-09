import { BellFilled } from '@ant-design/icons'
import React, { useContext, useEffect, useState } from 'react'
import ClassFellowsListing from '../../Components/ClassFellowsListing'
import api from '../../api/api'
import User from '../../Context/Context'
import useFetchProfile from '../../utils/useFetchProfile'
import { useParams } from 'react-router'
import LoaderContext from '../../Context/LoaderContext'
import { toast } from 'react-toastify'

export default function AllClassfellowsPage() {
    const { user } = useFetchProfile();
    const { loader, setLoader } = useContext(LoaderContext);
    const [trainerData, setTrainerData] = useState([]);
    const [studentsData, setStudentsData] = useState([]);
    const { classId } = useParams();

    useEffect(() => {
        getAllClassfellows();
    }, [user]);

    const getAllClassfellows = () => {
        setLoader(true);
        api.get(`/api/classes/classmates/${classId}`)
            .then(res => {
                setTrainerData([...trainerData, res.data.teacher]);
                setStudentsData([...studentsData, ...res.data.students]);
                setLoader(false);
            })
            .catch(err => {
                setLoader(false);
                toast.error(err?.response.data.error);
            });
    }
    return (
        <div>
            <div className='flex text-2xl font-extrabold mb-4'>
                <div className="flex-1">
                    <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight mb-1">Teacher</h3>
                </div>
            </div>

            <div className='mb-4'>
                {
                    trainerData && <ClassFellowsListing data={trainerData} />
                }
            </div>

            <div className='flex text-2xl font-extrabold mb-4'>
                <div className="flex-1">
                    <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight mb-1">Classmates</h3>
                    <p className="text-sm text-muted-foreground font-normal">Get to know your fellow students!</p>
                </div>
            </div>

            <div className='mb-4'>
                <ClassFellowsListing data={studentsData} classId={classId} />
            </div>
        </div>
    )
}
