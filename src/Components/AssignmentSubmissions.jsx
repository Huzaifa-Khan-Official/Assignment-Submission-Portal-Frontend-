import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, Form, Input, Select, Button, message, InputNumber } from 'antd';
import api from '../api/api';
import { FaArrowLeft } from 'react-icons/fa';

const { Option } = Select;

export default function AssignmentSubmissions() {
    const { classId, assignmentId } = useParams();
    const [submissions, setSubmissions] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [evaluationModal, setEvaluationModal] = useState(false);
    const [currentSubmission, setCurrentSubmission] = useState(null);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        fetchSubmissions();
    }, [assignmentId]);

    const fetchSubmissions = async () => {
        try {
            const response = await api.get(`/api/assignments/${assignmentId}/submissions`);
            setSubmissions(response.data);
            setError('');
        } catch (err) {
            console.error('Error fetching submissions:', err);
            setError(err.response?.data?.error || 'Failed to fetch submissions');
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
            fetchSubmissions(); // Refresh the submissions list
        } catch (err) {
            console.error('Error submitting evaluation:', err);
            message.error(err.response?.data?.error || 'Failed to submit evaluation');
        }
    };

    if (loading) {
        return <div className="text-center p-4">Loading submissions...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center p-4">{error}</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl flex gap-2 font-bold mb-4">
                <div className='p-2 hover:bg-gray-300 bg-gray-200 rounded-full' title='Back to previous page' onClick={() => navigate(-1)}>
                    <FaArrowLeft />
                </div>
                Assignment Submissions
            </h1>
            {submissions.length === 0 ? (
                <p>No submissions yet.</p>
            ) : (
                <div className="grid gap-4">
                    {submissions.map((submission) => (
                        <div key={submission._id} className="border rounded-lg p-4 bg-white shadow">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h2 className="text-lg font-semibold">{submission.student.username}</h2>
                                    <p className="text-sm text-gray-600">{submission.student.email}</p>
                                </div>
                                <span className="text-sm text-gray-500">
                                    Submitted: {new Date(submission.submissionDate).toLocaleString()}
                                </span>
                            </div>
                            <p className="mb-2">{submission.description}</p>
                            {submission.fileLink && (
                                <a
                                    href={submission.fileLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline mb-2 inline-block"
                                >
                                    View Submitted File
                                </a>
                            )}
                            <div className="mt-4 flex justify-between items-center">
                                <div>
                                    <p className="text-sm">
                                        Marks: {submission.marks !== undefined ? submission.marks : 'Not graded'}
                                    </p>
                                    {submission.rating && <p className="text-sm">Rating: {submission.rating}</p>}
                                    {submission.remark && <p className="text-sm">Remark: {submission.remark}</p>}
                                </div>
                                <button
                                    onClick={() => handleEvaluate(submission)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                >
                                    Evaluate
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal
                title="Evaluate Submission"
                open={evaluationModal}
                onCancel={() => setEvaluationModal(false)}
                footer={null}
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
                        <InputNumber min={0} />
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
                        rules={[{ required: true, message: 'Please input a remark' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit Evaluation
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}