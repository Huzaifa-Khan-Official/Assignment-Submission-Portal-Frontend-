import { BellFilled, CloseOutlined } from '@ant-design/icons'
import React from 'react'
import StudentListingTable from '../../Components/StudentListingTable'

export default function StudentAllAssignmentPage() {
    return (
        <div>
            <div className='flex m-5 text-2xl font-mono font-extrabold'>
                <h1 className='flex-1'>Assignment</h1>
                <BellFilled className='flex-2 text-amber-400' />
            </div>

            <div className='m-2 p-1 bg-stone-200 rounded-md'>

                <div className='flex m-8 '>
                    <div className='flex-1'>
                        <ul className='flex gap-10 flex-1'>
                            <li className='text-lg font-bold'>Noman</li>
                            <li className='text-base text-sky-500 font-semibold'>128066</li>
                            <li className='text-base text-sky-500 font-semibold'>Batch-10</li>
                            <li className='text-base text-sky-700 font-semibold'>View Overall Report</li>
                        </ul>
                    </div>
                    <div>
                        <CloseOutlined className='text-lg text-red-700' />
                    </div>
                </div>
                <StudentListingTable />
            </div>
        </div>

    )
}
