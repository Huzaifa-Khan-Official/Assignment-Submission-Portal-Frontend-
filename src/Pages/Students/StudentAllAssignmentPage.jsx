import { BellFilled, CloseOutlined } from '@ant-design/icons'
import React, { useContext, useEffect } from 'react'
import StudentListingTable from '../../Components/StudentListingTable'
import User from '../../Context/Context'
import useFetchProfile from '../../utils/useFetchProfile';
import SubmitAssignment from '../../Components/SubmitAssignment';
import AssignmentSubmitFormModal from '../../Components/AssignmentSubmitFormModal/AssignmentSubmitFormModal';

export default function StudentAllAssignmentPage() {
    const { user } = useFetchProfile();
    return (
        <div>
            <div className='flex m-5 text-2xl font-mono font-extrabold'>
                <h1 className='flex-1'>Assignments</h1>
            </div>

            <div className='m-2 p-1 bg-stone-200 rounded-md'>

                <div className='flex my-3 mx-2'>
                    <div className='flex-1'>
                        <ul className='flex gap-4 items-center flex-wrap'>
                            <li className='text-lg font-bold uppercase'>{user?.username}</li>
                            <li className='text-base text-sky-500 font-semibold'>Roll No. {user?._id.slice(0, 6)}</li>
                        </ul>
                    </div>
                </div>

                <div className='w-full'>
                    <StudentListingTable />
                </div>
            </div>
        </div>

    )
}
