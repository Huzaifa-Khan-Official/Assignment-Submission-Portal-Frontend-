import React from 'react';
import { Space, Table, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const columns = [
    {
        title: 'Number',
        dataIndex: 'number',
        key: 'number',
        render: (text) => <a className="text-blue-500 block w-max">{text}</a>,
    },
    {
        title: 'Topic',
        dataIndex: 'topic',
        key: 'topic',
        render: (text) => <a className="block w-max">{text}</a>,
    },
    {
        title: 'Due date',
        dataIndex: 'date',
        key: 'date',
        render: (text) => <a className="block w-max">{text}</a>,
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
                        color = 'geekblue';
                    }
                    if (tag === 'pending') {
                        color = 'green';
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
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a><PlusOutlined /></a>
            </Space>
        ),
    },
];

const data = [
    {
        key: '1',
        number: 'Assignment 1',
        date: '10-05-24',
        topic: 'Html , Css',
        tags: ['submitted'],
    },
    {
        key: '2',
        number: 'Assignment 2',
        date: '12-05-24',
        topic: 'JavaScript , React JS',
        tags: ['expired'],
    },
    {
        key: '3',
        number: 'Assignment 3',
        date: '14-05-24',
        topic: 'Express JS , MongoDB',
        tags: ['pending'],
    },
    {
        key: '4',
        number: 'Assignment 4',
        date: '16-05-24',
        topic: 'Node JS',
        tags: ['submitted'],
    },
];

const StudentListingTable = () => (
    <div className="pt-4 shadow-lg">
        <Table
            className="min-w-full bg-white shadow-lg rounded-lg overflow-x-scroll md:overflow-x-hidden"
            columns={columns}
            dataSource={data}
            pagination={false}
        />
    </div>
);

export default StudentListingTable;