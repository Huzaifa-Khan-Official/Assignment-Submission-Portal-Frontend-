import { BellFilled } from '@ant-design/icons'
import { Input, Table, Tag } from 'antd'
import React from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom';

const columns = [
    {
        title: 'S/No',
        dataIndex: 'serialNo',
        key: 'serialNo',
        width: 100,
        render: (number) => <a className='block w-max'>{number}</a>,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => (
            <div className='block w-max px-2'>
                <div>{text}</div>
                <div style={{ marginTop: '10px', fontSize: '12px', color: 'gray' }}>{record.rollNum}</div>
            </div>
        )
    },
    {
        title: 'Grade',
        dataIndex: 'grade',
        key: 'grade',
        render: (text) => <a className='block w-max'>{text}</a>,
    },
    {
        title: 'Status',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'expired') {
                        color = 'volcano';
                    }
                    if (tag === 'submitted') {
                        color = 'geekblue'
                    }
                    if (tag === 'pending') {
                        color = 'green'
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (link) => <Link to={'/student/report'} className='block w-max px-2'>{link}</Link>,
    },
    // Add more columns as needed
];

const dataSource = [
    {
        key: '1',
        serialNo: '01',
        name: 'M. Noman',
        rollNum: '128066',
        grade: 'A+1',
        tags: ['submitted'],
        action: 'Preview'
    },
    {
        key: '2',
        serialNo: '02',
        name: 'Huzaifa Khan',
        rollNum: '128067',
        grade: 'N / A',
        tags: ['pending'],
        action: 'Preview'

    },
    {
        key: '3',
        serialNo: '03',
        name: 'Jamsheed Khan',
        rollNum: '128068',
        grade: 'A+1',
        tags: ['submitted'],
        action: 'Preview'

    },
    {
        key: '4',
        serialNo: '04',
        name: 'Tayyab',
        rollNum: '128069',
        grade: 'N / A',
        tags: ['expired'],
        action: 'Preview'

    }
    // Add more data as needed
];

export default function AllStudentGradePage() {
    return (
        <div>
            <div className='flex m-5 text-2xl font-mono font-extrabold'>
                <h1 className='flex-1'>All Students</h1>
                <BellFilled className='flex-2 text-amber-400' />
            </div>

            <div className='mx-7'>
                <div className='mb-4'>
                    <div>
                        <Input size="large" placeholder="Search" prefix={<IoSearchSharp />} className='rounded-3xl w-96' />
                    </div>
                </div>
                <Table
                    size='middle'
                    dataSource={dataSource}
                    columns={columns}
                    // className='overflow-x-auto'
                    className='min-w-full bg-white shadow-md rounded-lg overflow-x-auto md:overflow-x-hidden'
                />
            </div>

        </div>
    )
}