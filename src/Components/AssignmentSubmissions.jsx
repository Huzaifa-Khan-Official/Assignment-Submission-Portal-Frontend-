import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, Form, Input, Select, Button, message, InputNumber, Tabs, Progress, Tooltip, Card } from 'antd';
import { UserOutlined, FileOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import api from '../api/api';
import { FaArrowLeft } from 'react-icons/fa';

const { Option } = Select;

export default function AssignmentSubmissions() {
    const { classId, assignmentId } = useParams();
    const [submissions, setSubmissions] = useState([]);
    const [students, setStudents] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [evaluationModal, setEvaluationModal] = useState(false);
    const [currentSubmission, setCurrentSubmission] = useState(null);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        fetchData();
    }, [assignmentId, classId]);

    const fetchData = async () => {
        try {
            const [submissionsResponse, studentsResponse] = await Promise.all([
                api.get(`/api/assignments/${assignmentId}/submissions`),
                api.get(`/api/classes/students/${classId}`)
            ]);
            setSubmissions(submissionsResponse.data);
            setStudents(studentsResponse.data);
            setError('');
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err.response?.data?.error || 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handleEvaluate = (submission) => {
        setCurrentSubmission(submission);
        form.setFieldsValue({
            marks: submission.marks,
            rating: submission.rating,
            remark: submission.remark,
        });
        setEvaluationModal(true);
    };

    const handleEvaluationSubmit = async (values) => {
        try {
            await api.post(`/api/assignments/${assignmentId}/evaluate`, {
                studentId: currentSubmission.student._id,
                ...values,
            });
            message.success('Evaluation submitted successfully');
            setEvaluationModal(false);
            fetchData();
        } catch (err) {
            console.error('Error submitting evaluation:', err);
            message.error(err.response?.data?.error || 'Failed to submit evaluation');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center p-4 bg-red-100 rounded-lg m-4">{error}</div>;
    }

    const submittedStudentIds = submissions.map(sub => sub.student._id);
    const notSubmittedStudents = students.filter(student => !submittedStudentIds.includes(student._id));

    const renderStudentCard = (student, isSubmission = false, submission = null) => (
        <Card
            key={student._id}
            className="w-full mb-4 hover:shadow-lg transition-shadow duration-300 p-0 h-fit"
            styles={{ body: { padding: "20px 10px", width: "100%", display: "flex", flexWrap: "wrap", gap: "10px" } }}
            actions={isSubmission ? [
                <Tooltip title="Evaluate">
                    <Button type="primary" onClick={() => handleEvaluate(submission)} icon={<CheckCircleOutlined />}>
                        Evaluate
                    </Button>
                </Tooltip>
            ] : [
                <Tooltip title="Not submitted">
                    <ClockCircleOutlined style={{ color: '#faad14' }} />
                </Tooltip>
            ]}
        >
            <Card.Meta
                avatar={<UserOutlined className="text-2xl" />}
                title={student.username}
                description={<div className='break-all'>{student.email}</div>}
                className='flex items-center'
            />
            {isSubmission && (
                <div className="mt-4">
                    <p className="text-sm text-gray-500">
                        Submitted: {new Date(submission.submissionDate).toLocaleString()}
                    </p>
                    <p className="mt-2">{submission.description}</p>
                    {submission.fileLink && (
                        <a
                            href={submission.fileLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline mt-2 inline-flex items-center"
                        >
                            <FileOutlined className="mr-1" /> View Submitted File
                        </a>
                    )}
                    {submission.marks !== undefined && (
                        <div className="mt-4">
                            Obtained marks: {submission.marks}
                            <p className="text-sm mt-2">Rating: {submission.rating || 'Not rated'}</p>
                            <p className="text-sm mt-1">Remark: {submission.remark || 'No remark'}</p>
                        </div>
                    )}
                </div>
            )}
        </Card>
    );

    const submissionRate = (submissions.length / students.length) * 100;

    const tabItems = [
        {
            label: (
                <span>
                    <CheckCircleOutlined className='pe-1' />
                    Submitted ({submissions.length})
                </span>
            ),
            key: '1',
            children: (
                submissions.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">No submissions yet.</p>
                ) : (
                    <div
                        className='!block sm:!grid sm:gap-3 sm:grid-cols-2 md:grid-cols-3'
                    >
                        {submissions.map((submission) => renderStudentCard(submission.student, true, submission))}
                    </div>
                )
            ),
        },
        {
            label: (
                <span>
                    <ClockCircleOutlined className='pe-1' />
                    Not Submitted ({notSubmittedStudents.length})
                </span>
            ),
            key: '2',
            children: (
                notSubmittedStudents.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">All students have submitted.</p>
                ) : (
                    <div
                        className='!block sm:!grid sm:gap-3 sm:grid-cols-2 md:grid-cols-3'
                    >
                        {notSubmittedStudents.map((student) => renderStudentCard(student))}
                    </div>
                )
            ),
        },
    ];

    return (
        <div className="p-6 pe-3 bg-gray-100 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-gray-300 bg-gray-200 rounded-full transition-colors duration-300"
                        title='Back to previous page'
                    >
                        <FaArrowLeft />
                    </button>
                    Assignment Submissions
                </h1>

                <Card className="mb-8 bg-white shadow-md">
                    <div className="flex justify-between items-center flex-wrap gap-3">
                        <div>
                            <h2 className="text-xl font-semibold mb-4 break-words">Submission Overview</h2>
                            <p>Total Students: {students.length}</p>
                            <p>Submissions: {submissions.length}</p>
                            <p>Remaining: {notSubmittedStudents.length}</p>
                        </div>
                        <div className='w-full sm:w-auto flex justify-center'>
                            <Tooltip title={`${submissionRate.toFixed(1)}% submitted`}>
                                <Progress
                                    type="circle"
                                    percent={Math.round(submissionRate)}
                                    format={percent => `${percent}%`}
                                    size={120}
                                />
                            </Tooltip>
                        </div>
                    </div>
                </Card>

                <Tabs defaultActiveKey="1" type="card"
                    className="bg-white p-4 rounded-lg shadow-md w-full"
                    items={tabItems}
                />

                <Modal
                    title="Evaluate Submission"
                    open={evaluationModal}
                    onCancel={() => setEvaluationModal(false)}
                    footer={null}
                    className="max-w-md"
                >
                    <Form form={form} onFinish={handleEvaluationSubmit} layout="vertical">
                        <Form.Item
                            name="marks"
                            label="Marks"
                            rules={[
                                { required: true, message: 'Please input marks' },
                                { type: 'number', min: 0, max: 100, message: 'Marks must be between 0 and 100' }
                            ]}
                        >
                            <InputNumber min={0} max={100} className="w-full" />
                        </Form.Item>
                        <Form.Item
                            name="rating"
                            label="Rating"
                            rules={[{ required: true, message: 'Please select a rating' }]}
                        >
                            <Select>
                                <Option value="Excellent">Excellent</Option>
                                <Option value="Good">Good</Option>
                                <Option value="Fair">Fair</Option>
                                <Option value="Poor">Poor</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="remark"
                            label="Remark"
                            rules={[{ required: false }]}
                        >
                            <Input.TextArea placeholder="Enter any remarks (optional)" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="w-full">
                                Submit Evaluation
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
}