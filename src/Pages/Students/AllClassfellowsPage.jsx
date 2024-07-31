import { BellFilled } from '@ant-design/icons'
import React, { useContext, useEffect } from 'react'
import ClassFellowsListing from '../../Components/ClassFellowsListing'
import api from '../../api/api'
import User from '../../Context/Context'
import useFetchProfile from '../../utils/useFetchProfile'

export default function AllClassfellowsPage() {
    const { user } = useFetchProfile();

    useEffect(() => {
        getAllClassfellows();
    }, [user]);

    const getAllClassfellows = () => {
        console.log(user?._id);
        api.get(`/api/classes/classmates/${user?._id}`)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }
    return (
        <div>
            <div className='flex m-5 text-2xl font-mono font-extrabold'>
                <div className="flex-1 p-6">
                    <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Classmates</h3>
                    <p className="text-sm text-muted-foreground">Get to know your fellow students!</p>
                </div>
                <BellFilled className='flex-2 text-amber-400' />
            </div>

            <div className='ps-6 pe-3'>
                <ClassFellowsListing />
            </div>
        </div>
    )
}
