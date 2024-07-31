import React from 'react'
import { BellFilled } from '@ant-design/icons'
import { Table, Tag } from 'antd';

const columns = [
    {
        title: 'Serial No.',
        dataIndex: 'serialNo',
        key: 'serialNo',
        width: 100
    },
    {
        title: 'Topic',
        dataIndex: 'topic',
        key: 'topic',
        width: 250
    },
    {
        title: 'Issues Date',
        dataIndex: 'issueDate',
        key: 'issueDate',
        width: 150,
    },
    {
        title: 'Due Date',
        dataIndex: 'expireDate',
        key: 'expireDate',
        width: 150,
    },
    {
        title: 'Status',
        key: 'tags',
        dataIndex: 'tags',
        width: 100,
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
];

const data = [
    {
        key: '1',
        serialNo: '01',
        issueDate: '02-06-24',
        expireDate: '10-08-24',
        topic: 'HTML',
        tags: ['submitted'],

    },
    {
        key: '2',
        serialNo: '02',
        issueDate: '04-06-24',
        expireDate: '12-08-24',
        topic: 'CSS',
        tags: ['expired'],

    },
    {
        key: '3',
        serialNo: '03',
        issueDate: '06-06-24',
        expireDate: '14-08-24',
        topic: 'JavaScript',
        tags: ['pending'],

    },
    {
        key: '4',
        serialNo: '04',
        issueDate: '08-06-24',
        expireDate: '16-08-24',
        topic: 'React JS',
        tags: ['submitted'],

    },
];

export default function StudentAssignmentTodoPage() {
    return (
        <div>
            <div className='flex m-5 text-2xl font-mono font-extrabold'>
                <h1 className='flex-1'>Todos</h1>
                <BellFilled className='flex-2 text-amber-400' />
            </div>

            <div className='flex my-8 mx-12 px-5 py-3 rounded-lg text-2xl font-sans font-bold bg-sky-200'>
                <h1 className='flex-1'>Web Development</h1>
                <h1 className='flex-2'>Batch-10</h1>
            </div>

            <div className='w-full'>
                <Table
                    className='mx-12'
                    columns={columns}
                    dataSource={data}
                    bordered={false} // Set bordered to false to remove borders
                    pagination={false} // Remove pagination
                />
            </div>

        </div>
    )
}
