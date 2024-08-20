import React, { useEffect, useState } from 'react';
import { Table, Tag, Tooltip, Button, message, Upload, Modal, Progress, Space, Select } from 'antd';
import { FileOutlined, CheckCircleOutlined, ClockCircleOutlined, WarningOutlined, UploadOutlined, FilterOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';
import useFetchProfile from '../utils/useFetchProfile';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../config/firebaseConfig.js';

const { Option } = Select;
const storage = getStorage(app);

const StudentListingTable = () => {
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [submitModalVisible, setSubmitModalVisible] = useState(false);
    const [currentAssignment, setCurrentAssignment] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const { user } = useFetchProfile();
    const { classId } = useParams();
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    useEffect(() => {
        fetchAssignments();
    }, [classId, user]);

    const fetchAssignments = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/api/assignments/student/class/${classId}`);
            const formattedData = response.data?.map((assignment, index) => ({
                key: assignment._id,
                number: `Assignment ${index + 1}`,
                title: assignment.title,
                description: assignment.description,
                dueDate: new Date(assignment.dueDate).toLocaleDateString(),
                status: getAssignmentStatus(assignment, user?._id),
                totalMarks: assignment.total_marks,
                fileLink: assignment.fileLink,
                submitted: assignment.submissions.some(sub => sub.student.toString() === user._id.toString()),
                evaluated: assignment.submissions.some(sub => sub.student.toString() === user._id.toString() && sub.marks !== undefined),
            }));
            setAssignments(formattedData.reverse());
        } catch (error) {
            console.error('Error fetching assignments:', error);
            message.error('Failed to fetch assignments');
        } finally {
            setLoading(false);
        }
    };

    const getAssignmentStatus = (assignment, userId) => {
        const now = new Date();
        const dueDate = new Date(assignment.dueDate);
        if (assignment.submissions.some(sub => sub.student.toString() === userId.toString())) {
            if (assignment.submissions.some(sub => sub.student.toString() === userId.toString() && sub.marks !== undefined)) {
                return 'evaluated';
            }
            return 'submitted';
        }
        if (now > dueDate) return 'expired';
        return 'todo';
    };

    const handleSubmit = (assignment) => {
        setCurrentAssignment(assignment);
        setSubmitModalVisible(true);
    };

    const uploadFileToFirebase = (file) => {
        return new Promise((resolve, reject) => {
            const fileName = `assignments/${currentAssignment.key}/${user._id}_${file.name}`;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error("Upload error:", error);
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    const handleSubmitOk = async (file) => {
        if (!file) {
            message.error('Please select a file to submit');
            return;
        }

        setSubmitting(true);
        try {
            const fileLink = await uploadFileToFirebase(file);

            await api.post(`/api/assignments/${currentAssignment.key}/submit`, {
                fileLink: fileLink
            });

            message.success('Assignment submitted successfully');
            setSubmitModalVisible(false);
            fetchAssignments(); // Refresh the assignments list
        } catch (error) {
            console.error('Error submitting assignment:', error);
            message.error('Failed to submit assignment');
        } finally {
            setSubmitting(false);
            setUploadProgress(0);
        }
    };

    const handleRowClick = (record) => {
        navigate(`/student/class/${classId}/${record.key}`);
    };

    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    const clearFilters = () => {
        setFilteredInfo({});
    };

    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
            sortOrder: sortedInfo.columnKey === 'title' && sortedInfo.order,
            width: 130,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 200,
        },
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
            width: 130,
            sorter: (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
            sortOrder: sortedInfo.columnKey === 'dueDate' && sortedInfo.order,
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            width: 150,
            filters: [
                { text: 'Todo', value: 'todo' },
                { text: 'Submitted', value: 'submitted' },
                { text: 'Evaluated', value: 'evaluated' },
                { text: 'Expired', value: 'expired' },
            ],
            filteredValue: filteredInfo.status || null,
            onFilter: (value, record) => record.status.includes(value),
            render: (status) => {
                let color = 'green';
                let icon = <CheckCircleOutlined />;
                if (status === 'expired') {
                    color = 'red';
                    icon = <WarningOutlined />;
                } else if (status === 'todo') {
                    color = 'orange';
                    icon = <ClockCircleOutlined />;
                } else if (status === 'evaluated') {
                    color = 'blue';
                    icon = <CheckCircleOutlined />;
                }
                return (
                    <Tag color={color} icon={icon}>
                        {status.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: 'Total Marks',
            dataIndex: 'totalMarks',
            key: 'totalMarks',
            width: 100,
            sorter: (a, b) => a.totalMarks - b.totalMarks,
            sortOrder: sortedInfo.columnKey === 'totalMarks' && sortedInfo.order,
            render: (marks) => <span>{marks} points</span>,
        },
        {
            title: 'Action',
            key: 'action',
            width: 200,
            render: (_, record) => (
                <Space size="small">
                    <Tooltip title="View Assignment">
                        <Button
                            type="primary"
                            icon={<FileOutlined />}
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(record.fileLink, '_blank');
                            }}
                            disabled={!record.fileLink}
                            size="small"
                        >
                            View
                        </Button>
                    </Tooltip>
                    <Tooltip title={record.submitted ? "Already Submitted" : record.status === 'expired' ? "Submission Closed" : "Submit Assignment"}>
                        <Button
                            type="default"
                            icon={<UploadOutlined />}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSubmit(record);
                            }}
                            disabled={record.submitted || record.status === 'expired'}
                            size="small"
                        >
                            Submit
                        </Button>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <div className="px-2">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
                <h2 className="text-2xl font-bold">Class Assignments</h2>
                <Space className='flex flex-wrap break-words'>
                    <Button onClick={clearFilters}>Clear filters</Button>
                    <Button onClick={clearAll} style={{wordBreak: "break-word"}}>Clear filters and sorters</Button>
                </Space>
            </div>
            <Table
                className='min-w-full bg-white shadow-lg rounded-lg overflow-x-auto px-3 mb-5 hover:cursor-pointer'
                columns={columns}
                dataSource={assignments}
                loading={loading}
                onChange={handleChange}
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                }}
                onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                })}
            />
            <Modal
                title="Submit Assignment"
                open={submitModalVisible}
                onCancel={() => {
                    setSubmitModalVisible(false);
                    setUploadProgress(0);
                }}
                footer={null}
            >
                <Upload
                    beforeUpload={(file) => {
                        handleSubmitOk(file);
                        return false;
                    }}
                    disabled={submitting}
                >
                    <Button icon={<UploadOutlined />} loading={submitting} disabled={submitting}>
                        {submitting ? 'Uploading...' : 'Select File to Submit'}
                    </Button>
                </Upload>
                {uploadProgress > 0 && (
                    <Progress percent={Math.round(uploadProgress)} status="active" />
                )}
            </Modal>
        </div>
    );
};

export default StudentListingTable;