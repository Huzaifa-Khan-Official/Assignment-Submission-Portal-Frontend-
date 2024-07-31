import { BellFilled } from '@ant-design/icons'
import React from 'react'
import ClassFellowsListing from '../../Components/ClassFellowsListing'

export default function AllClassfellowsPage() {
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
