import React, { useContext, useEffect, useState } from 'react';
import {
    Layout, Typography, Card, Avatar, Tag, Tabs, Row, Col,
    Progress, List, Table, Badge, Statistic,
    Modal,
} from 'antd';
import {
    UserOutlined, CalendarOutlined, BookOutlined,
    FileTextOutlined, BellOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useLocation, useNavigate, useParams } from 'react-router';
import api from '../../api/api';
import { toast } from 'react-toastify';
import LoaderContext from '../../Context/LoaderContext';
import { VscOpenPreview } from 'react-icons/vsc';

const { Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

// Mock data
const classInfo = {
    schedule: "Mon, Wed, Fri 10:00 AM - 12:00 PM",
    endDate: "2023-12-15",
};

const trainerInfo = {
    courses: ["HTML/CSS", "JavaScript", "React"],
};



const attendanceData = [
    { date: '09/01', attendance: 92 },
    { date: '09/08', attendance: 88 },
    { date: '09/15', attendance: 95 },
    { date: '09/22', attendance: 90 },
    { date: '09/29', attendance: 93 },
];

const performanceData = [
    { assignment: 'A1', avgScore: 85 },
    { assignment: 'A2', avgScore: 78 },
    { assignment: 'A3', avgScore: 92 },
    { assignment: 'A4', avgScore: 88 },
];

const assignmentsInfo = [
    { name: "Project 1", dueDate: "2023-09-15", submitted: 22, graded: 20 },
    { name: "Quiz 1", dueDate: "2023-09-22", submitted: 25, graded: 25 },
    { name: "Project 2", dueDate: "2023-10-06", submitted: 18, graded: 15 },
];

const classResources = [
    { name: "Week 1 Slides", type: "PDF" },
    { name: "JavaScript Basics", type: "Video" },
    { name: "React Tutorial", type: "Link" },
];

export default function TrainerClassDetailPage() {
    const location = useLocation();
    const { classId } = useParams();
    const { setLoader } = useContext(LoaderContext);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [unEnrolledStudents, setUnEnrolledStudents] = useState(null);
    const [unEnrolledStudentsError, setUnEnrolledStudentsError] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [studentsData, setStudentsData] = useState(null);
    const { trainerData, classData } = location.state;
    const [activeTab, setActiveTab] = useState("1");
    const navigate = useNavigate();

    useEffect(() => {
        const getUnEnrolledStudents = async () => {
            try {
                const res = await api.get("/api/users/students/unenrolled");
                setUnEnrolledStudents(res.data);
            } catch (error) {
                setUnEnrolledStudentsError(error.response.data.message);
            }
        }

        getStudentsOfClass();
        getUnEnrolledStudents();
    }, []);

    const getStudentsOfClass = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/api/classes/admin/students/${classId}`)
            setStudentsData(res.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log("error ==>", error.response.data.error);
        }
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedRowKeys([]);
    };

    const studentColumns = [
        {
            title: 'Name',
            dataIndex: 'username',
            key: 'username',
            render: (text, record) => (
                <span>
                    <Avatar size="small" icon={<UserOutlined />} /> {text}
                </span>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <div className='flex gap-4'>
                    <button className='myBtn' onClick={() => navigate(`/admin/student/${record._id}`)} title='View Details'>
                        <VscOpenPreview />
                    </button>
                </div>
            ),
        },
        // {
        //     title: 'Is Verified',
        //     dataIndex: 'isVerified',
        //     key: 'isVerified',
        //     render: (isVerified) => (
        //         <Tag color={isVerified ? 'green' : 'red'}>{isVerified ? "True" : "False"}</Tag>
        //     ),
        // },
    ];

    const studentInfo = {
        totalStudents: classData.students.length,
    };

    const paginationConfig = {
        pageSize: 10,
    };

    const tabItems = [
        {
            label: "Overview",
            key: '1',
            children: (
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Card title="Class Progress">
                            <Statistic title="Overall Progress" value={75} suffix="%" />
                            <Progress percent={75} status="active" />
                            <Statistic title="Assignments Completed" value={18} suffix="/ 24" style={{ marginTop: '16px' }} />
                            <Progress percent={75} status="active" />
                            <Statistic title="Average Attendance" value={92} suffix="%" style={{ marginTop: '16px' }} />
                            <Progress percent={92} status="active" />
                        </Card>
                    </Col>
                    <Col xs={24} md={12}>
                        <Card title="Recent Activity">
                            <List
                                dataSource={[
                                    { icon: <CalendarOutlined />, text: "New assignment posted: Project 3" },
                                    { icon: <UserOutlined />, text: "2 new students enrolled" },
                                    { icon: <FileTextOutlined />, text: "Grades posted for Quiz 2" },
                                    { icon: <BellOutlined />, text: "Reminder: Project 2 due in 3 days" },
                                ]}
                                renderItem={(item) => (
                                    <List.Item>
                                        {item.icon} {item.text}
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
            ),
        },
        {
            label: "Students",
            key: "2",
            children: (
                <Card title={<h1 className='flex justify-between items-center'>Student Information (Total: {studentInfo.totalStudents})
                    <button onClick={showModal} title='Add Teacher'>
                        <PlusOutlined className='hover:bg-gray-200 rounded-full p-2' />
                    </button>
                </h1>}>
                    <Table dataSource={studentsData} columns={studentColumns} className='min-w-full bg-white shadow-md rounded-lg overflow-x-auto' pagination={paginationConfig} rowKey={(record) => record._id} loading={loading} />
                    <Title level={4} style={{ marginTop: '24px' }}>Attendance Record</Title>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={attendanceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="attendance" fill="#1890ff" />
                        </BarChart>
                    </ResponsiveContainer>

                    <Title level={4} style={{ marginTop: '24px' }}>Performance Overview</Title>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={performanceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="assignment" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="avgScore" fill="#52c41a" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            )
        },
        {
            label: "Assignments",
            key: "3",
            children: (
                <Card title={`Assignments Information (Total: ${assignmentsInfo.length})`}>
                    <List
                        dataSource={assignmentsInfo}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={item.name}
                                    description={`Due Date: ${item.dueDate}`}
                                />
                                <div>
                                    <Badge status="processing" text={`${item.submitted}/${studentInfo.totalStudents} Submitted`} />
                                    <br />
                                    <Badge status="success" text={`${item.graded}/${item.submitted} Graded`} />
                                </div>
                            </List.Item>
                        )}
                    />
                </Card>
            )
        },
        {
            label: "Resources",
            key: "4",
            children: (
                <Card title="Class Resources">
                    <List
                        dataSource={classResources}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<BookOutlined />}
                                    title={item.name}
                                    description={item.type}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            )
        },
        {
            label: "Reports",
            key: "5",
            children: (
                <Card title="Class Progress & Reports">
                    <Title level={4}>Overall Class Performance</Title>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={performanceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="assignment" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="avgScore" fill='#722ed1' />
                        </BarChart>
                    </ResponsiveContainer>

                    <Title level={4} style={{ marginTop: '24px' }}>Recent Activity Logs</Title>
                    <List
                        dataSource={[
                            { icon: <CalendarOutlined />, text: "New assignment 'Project 3' added on 2023-10-15" },
                            { icon: <UserOutlined />, text: "2 new students enrolled on 2023-10-12" },
                            { icon: <FileTextOutlined />, text: "Mid-term grades posted on 2023-10-10" },
                        ]}
                        renderItem={(item) => (
                            <List.Item>
                                {item.icon} {item.text}
                            </List.Item>
                        )}
                    />
                </Card>
            )
        }
    ];

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const addUnEnrolledStudents = async () => {
        setLoader(true);
        handleCancel();
        try {
            const data = {
                studentIds: selectedRowKeys,
                classId: classId
            }
            const res = await api.post(`/api/users/students`, data);
            console.log("res ==>", res);
            setLoader(false);
            getStudentsOfClass();
            toast.success(res.data.message);
        } catch (error) {
            setLoader(false);
            console.log("error ==>", error || "Something went wrong!");
        }
    };

    return (
        <Layout>
            <Content style={{ padding: '24px' }}>
                <Title level={2}>{classData.name}</Title>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={16}>
                        <Card title="Class Information">
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <Statistic title="Class Code" value={classData.join_code} />
                                </Col>
                                <Col span={12}>
                                    <Statistic title="Schedule" value={classInfo.schedule} />
                                </Col>
                                <Col span={12}>
                                    <Statistic title="Start Date" value={classData.createdAt.slice(0, 10)} />
                                </Col>
                                <Col span={12}>
                                    <Statistic title="End Date" value={classInfo.endDate} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col xs={24} md={8}>
                        <Card title="Trainer Information">
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                <Avatar size={64} icon={<UserOutlined />} />
                                <div style={{ marginLeft: '16px' }}>
                                    <Text strong>{trainerData.username}</Text>
                                    <br />
                                    <Text type="secondary">{trainerData.email}</Text>
                                </div>
                            </div>
                            <div>
                                <Text strong>Assigned Courses:</Text>
                                <br />
                                <div className='flex flex-wrap gap-1'>
                                    {trainerInfo.courses.map((course, index) => (
                                        <Tag key={index} color="blue" className='ms-0'>{course}</Tag>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ marginTop: '24px' }} defaultActiveKey="1" items={tabItems} />
            </Content>

            <Modal
                title="Add Students"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={<div>
                    <button className='bg-blue-500 text-white p-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300' onClick={addUnEnrolledStudents} disabled={unEnrolledStudentsError ? true : false}>
                        Add Students
                    </button>
                </div>}
                className="max-w-md"
            >
                <div className='border-t-2 pt-3'>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
                    {
                        unEnrolledStudentsError ?
                            <Tag color="red">{unEnrolledStudentsError}</Tag>
                            :
                            <div>
                                <Table dataSource={unEnrolledStudents} columns={studentColumns} className='min-w-full bg-white shadow-md rounded-lg overflow-x-auto' pagination={paginationConfig} rowKey={(record) => record._id} rowSelection={rowSelection} />
                            </div>
                    }
                </div>
            </Modal>
        </Layout>
    );
}