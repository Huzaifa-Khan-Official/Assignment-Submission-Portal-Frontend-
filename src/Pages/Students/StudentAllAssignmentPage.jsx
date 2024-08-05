import { BellFilled, CloseOutlined } from '@ant-design/icons'
import React, { useContext } from 'react'
import StudentListingTable from '../../Components/StudentListingTable'
import User from '../../Context/Context'
import useFetchProfile from '../../utils/useFetchProfile';

export default function StudentAllAssignmentPage() {
    const { user } = useFetchProfile();
    return (
        <div>
            <div className='m-2 p-1 rounded-md'>

                <div className='flex'>
                    <div className='flex-1'>
                        <ul className='flex gap-10 flex-1'>
                            <li className='text-lg font-bold uppercase'>{user?.username}</li>
                            <li className='text-base text-sky-500 font-semibold'>128066</li>
                            <li className='text-base text-sky-500 font-semibold'>Batch-10</li>
                            <li className='text-base text-sky-700 font-semibold'>
                                <button>
                                    View Overall Report
                                </button>
                            </li>
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
