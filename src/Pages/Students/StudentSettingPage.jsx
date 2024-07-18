import React from 'react'
import { BellFilled } from '@ant-design/icons'
import { FaUserLock, FaBell } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { ImSearch } from "react-icons/im";
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const items = [
    {
        key: 'sub1',
        icon: <FaBell />,
        label: 'Notifications',
        children: [
            {
                key: '1-1',
                label: 'Item 1',
                type: 'group',
                children: [
                    {
                        key: '1',
                        label: 'Option 1',
                    },
                    {
                        key: '2',
                        label: 'Option 2',
                    },
                ],
            },
            {
                key: '1-2',
                label: 'Item 2',
                type: 'group',
                children: [
                    {
                        key: '3',
                        label: 'Option 3',
                    },
                    {
                        key: '4',
                        label: 'Option 4',
                    },
                ],
            },
        ],
    },
    {
        icon: <FaUserLock />,
        label: (<Link to="/student/profile">Update Profile</Link>),
    },
    {
        key: 'sub5',
        label: 'Change password',
        icon: <FaUserLock />,
        children: [
            {
                key: '9',
                label: 'Option 9',
            },
            {
                key: '10',
                label: 'Option 10',
            },
            {
                key: '11',
                label: 'Option 11',
            },
            {
                key: '12',
                label: 'Option 12',
            },
        ],
    },
    {
        key: 'sub4',
        label: 'Help',
        icon: <ImSearch />,
        children: [
            {
                key: '13',
                label: 'Option 13',
            },
            {
                key: '14',
                label: 'Option 14',
            },
            {
                key: '15',
                label: 'Option 15',
            },
            {
                key: '16',
                label: 'Option 16',
            },
        ],
    },
];
const onClick = (e) => {
    console.log('click', e);
};


export default function StudentSettingPage() {
    return (
        <div>
            <div className='flex m-5 text-2xl font-mono font-extrabold'>
                <h1 className='flex-1'>Settings</h1>
                <BellFilled className='flex-2 text-amber-400' />
            </div>

            <Menu
                onClick={onClick}
                style={{
                    width: 356,
                }}
                className='my-7 mx-7 rounded-lg'
                mode="vertical"
                items={items}
            />
        </div>
    )
}
