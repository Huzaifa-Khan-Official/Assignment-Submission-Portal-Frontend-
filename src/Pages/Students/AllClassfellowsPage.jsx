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
            <div className='flex text-2xl font-extrabold mb-4'>
                <div className="flex-1">
                    <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight mb-1">Teacher</h3>
                </div>
            </div>

            <div className='mb-4'>
                <ClassFellowsListing />
            </div>

            <div className='flex text-2xl font-extrabold mb-4'>
                <div className="flex-1">
                    <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight mb-1">Classmates</h3>
                    <p className="text-sm text-muted-foreground font-normal">Get to know your fellow students!</p>
                </div>
            </div>

            <div className='mb-4'>
                <ClassFellowsListing />
            </div>
        </div>
    )
}
