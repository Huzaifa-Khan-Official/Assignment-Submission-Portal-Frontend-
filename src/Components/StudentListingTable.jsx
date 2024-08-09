import React, { useEffect, useState } from 'react';
import { Table, Tag, Tooltip, Button, message, Upload, Modal, Progress } from 'antd';
import { FileOutlined, CheckCircleOutlined, ClockCircleOutlined, WarningOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';
import useFetchProfile from '../utils/useFetchProfile';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../config/firebaseConfig.js';

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
    const { classId } = useParams()

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
            }));
            setAssignments(formattedData);
        } catch (error) {
            console.error('Error fetching assignments:', error);
            // message.error('Failed to fetch assignments');
        } finally {
            setLoading(false);
        }
    };

    const getAssignmentStatus = (assignment, userId) => {
        const now = new Date();
        const dueDate = new Date(assignment.dueDate);
        if (assignment.submissions.some(sub => sub.student.toString() === userId.toString())) return 'submitted';
        if (now > dueDate) return 'expired';
        return 'pending';
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
        // console.log(record.key)
        navigate(`/student/class/${classId}/${record.key}`);
    };
    const columns = [
        // {
        //     title: 'Number',
        //     dataIndex: 'number',
        //     key: 'number',
        //     render: (text) => <span className="font-medium">{text}</span>,
        // },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <Tooltip title={record.description}>
                    <span className="cursor-help">{text}</span>
                </Tooltip>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text, record) => (
                <Tooltip title={record.description}>
                    <span className="cursor-help">{text}</span>
                </Tooltip>
            ),
        },
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (status) => {
                let color = 'green';
                let icon = <CheckCircleOutlined />;
                if (status === 'expired') {
                    color = 'red';
                    icon = <WarningOutlined />;
                } else if (status === 'pending') {
                    color = 'orange';
                    icon = <ClockCircleOutlined />;
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
            render: (marks) => <span>{marks} points</span>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div className="space-x-2">
                    <Tooltip title="View Assignment">
                        <Button
                            type="primary"
                            icon={<FileOutlined />}
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(record.fileLink, '_blank');
                            }}
                            disabled={!record.fileLink}
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
                        >
                            Submit
                        </Button>
                    </Tooltip>
                </div>
            ),
        },
    ];


    return (
        <div className="p-4 sm:p-8">
            <h2 className="text-2xl font-bold mb-4">Class Assignments</h2>
            <Table
                className="shadow-lg rounded-lg overflow-hidden"
                columns={columns}
                dataSource={assignments}
                loading={loading}
                pagination={{
                    pageSize: 5,
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