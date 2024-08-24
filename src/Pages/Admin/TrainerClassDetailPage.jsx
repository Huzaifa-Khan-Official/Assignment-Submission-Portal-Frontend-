// import React, { useState } from 'react';
// import {
//     Layout, Typography, Card, Avatar, Tag, Tabs, Row, Col,
//     Progress, List, Table, Badge, Statistic,
// } from 'antd';
// import {
//     UserOutlined, CalendarOutlined, BookOutlined,
//     FileTextOutlined, BellOutlined
// } from '@ant-design/icons';
// import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
// // import { Column } from '@ant-design/plots';

// const { Content } = Layout;
// const { Title, Text } = Typography;
// const { TabPane } = Tabs;

// // Mock data (same as before)
// const classInfo = {
//     name: "Advanced Web Development",
//     code: "WEB301",
//     schedule: "Mon, Wed, Fri 10:00 AM - 12:00 PM",
//     startDate: "2023-09-01",
//     endDate: "2023-12-15",
// };

// const trainerInfo = {
//     name: "Dr. Jane Smith",
//     email: "jane.smith@example.com",
//     courses: ["HTML/CSS", "JavaScript", "React"],
// };

// const studentInfo = {
//     totalStudents: 25,
//     students: [
//         { name: "Alice Johnson", email: "alice@example.com", status: "Active" },
//         { name: "Bob Williams", email: "bob@example.com", status: "Inactive" },
//         // ... more students
//     ],
// };

// const attendanceData = [
//     { date: '09/01', attendance: 92 },
//     { date: '09/08', attendance: 88 },
//     { date: '09/15', attendance: 95 },
//     { date: '09/22', attendance: 90 },
//     { date: '09/29', attendance: 93 },
// ];

// const performanceData = [
//     { assignment: 'A1', avgScore: 85 },
//     { assignment: 'A2', avgScore: 78 },
//     { assignment: 'A3', avgScore: 92 },
//     { assignment: 'A4', avgScore: 88 },
// ];

// const assignmentsInfo = [
//     { name: "Project 1", dueDate: "2023-09-15", submitted: 22, graded: 20 },
//     { name: "Quiz 1", dueDate: "2023-09-22", submitted: 25, graded: 25 },
//     { name: "Project 2", dueDate: "2023-10-06", submitted: 18, graded: 15 },
//     // ... more assignments
// ];

// const classResources = [
//     { name: "Week 1 Slides", type: "PDF" },
//     { name: "JavaScript Basics", type: "Video" },
//     { name: "React Tutorial", type: "Link" },
//     // ... more resources
// ];

// export default function TrainerClassDetailPage() {
//     const [activeTab, setActiveTab] = useState("1");

//     const studentColumns = [
//         {
//             title: 'Name',
//             dataIndex: 'name',
//             key: 'name',
//             render: (text, record) => (
//                 <span>
//                     <Avatar size="small" icon={<UserOutlined />} /> {text}
//                 </span>
//             ),
//         },
//         {
//             title: 'Email',
//             dataIndex: 'email',
//             key: 'email',
//         },
//         {
//             title: 'Status',
//             dataIndex: 'status',
//             key: 'status',
//             render: (status) => (
//                 <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
//             ),
//         },
//     ];

//     return (
//         <Layout>
//             <Content style={{ padding: '24px' }}>
//                 <Title level={2}>{classInfo.name}</Title>
//                 <Row gutter={[16, 16]}>
//                     <Col xs={24} md={16}>
//                         <Card title="Class Information">
//                             <Row gutter={[16, 16]}>
//                                 <Col span={12}>
//                                     <Statistic title="Class Code" value={classInfo.code} />
//                                 </Col>
//                                 <Col span={12}>
//                                     <Statistic title="Schedule" value={classInfo.schedule} />
//                                 </Col>
//                                 <Col span={12}>
//                                     <Statistic title="Start Date" value={classInfo.startDate} />
//                                 </Col>
//                                 <Col span={12}>
//                                     <Statistic title="End Date" value={classInfo.endDate} />
//                                 </Col>
//                             </Row>
//                         </Card>
//                     </Col>
//                     <Col xs={24} md={8}>
//                         <Card title="Trainer Information">
//                             <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
//                                 <Avatar size={64} icon={<UserOutlined />} />
//                                 <div style={{ marginLeft: '16px' }}>
//                                     <Text strong>{trainerInfo.name}</Text>
//                                     <br />
//                                     <Text type="secondary">{trainerInfo.email}</Text>
//                                 </div>
//                             </div>
//                             <div>
//                                 <Text strong>Assigned Courses:</Text>
//                                 <br />
//                                 {trainerInfo.courses.map((course, index) => (
//                                     <Tag key={index} color="blue">{course}</Tag>
//                                 ))}
//                             </div>
//                         </Card>
//                     </Col>
//                 </Row>

//                 <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ marginTop: '24px' }}>
//                     <TabPane tab="Overview" key="1">
//                         <Row gutter={[16, 16]}>
//                             <Col xs={24} md={12}>
//                                 <Card title="Class Progress">
//                                     <Statistic title="Overall Progress" value={75} suffix="%" />
//                                     <Progress percent={75} status="active" />
//                                     <Statistic title="Assignments Completed" value={18} suffix="/ 24" style={{ marginTop: '16px' }} />
//                                     <Progress percent={75} status="active" />
//                                     <Statistic title="Average Attendance" value={92} suffix="%" style={{ marginTop: '16px' }} />
//                                     <Progress percent={92} status="active" />
//                                 </Card>
//                             </Col>
//                             <Col xs={24} md={12}>
//                                 <Card title="Recent Activity">
//                                     <List
//                                         dataSource={[
//                                             { icon: <CalendarOutlined />, text: "New assignment posted: Project 3" },
//                                             { icon: <UserOutlined />, text: "2 new students enrolled" },
//                                             { icon: <FileTextOutlined />, text: "Grades posted for Quiz 2" },
//                                             { icon: <BellOutlined />, text: "Reminder: Project 2 due in 3 days" },
//                                         ]}
//                                         renderItem={(item) => (
//                                             <List.Item>
//                                                 {item.icon} {item.text}
//                                             </List.Item>
//                                         )}
//                                     />
//                                 </Card>
//                             </Col>
//                         </Row>
//                     </TabPane>
//                     <TabPane tab="Students" key="2">
//                         <Card title={`Student Information (Total: ${studentInfo.totalStudents})`}>
//                             <Table dataSource={studentInfo.students} columns={studentColumns} />
//                             <Title level={4} style={{ marginTop: '24px' }}>Attendance Record</Title>
//                             {/* <Column
//                                 data={attendanceData}
//                                 xField="date"
//                                 yField="attendance"
//                                 color="#1890ff"
//                             /> */}
//                             <Title level={4} style={{ marginTop: '24px' }}>Performance Overview</Title>
//                             {/* <Column
//                                 data={performanceData}
//                                 xField="assignment"
//                                 yField="avgScore"
//                                 color="#52c41a"
//                             /> */}
//                         </Card>
//                     </TabPane>
//                     <TabPane tab="Assignments" key="3">
//                         <Card title={`Assignments Information (Total: ${assignmentsInfo.length})`}>
//                             <List
//                                 dataSource={assignmentsInfo}
//                                 renderItem={(item) => (
//                                     <List.Item>
//                                         <List.Item.Meta
//                                             title={item.name}
//                                             description={`Due Date: ${item.dueDate}`}
//                                         />
//                                         <div>
//                                             <Badge status="processing" text={`${item.submitted}/${studentInfo.totalStudents} Submitted`} />
//                                             <br />
//                                             <Badge status="success" text={`${item.graded}/${item.submitted} Graded`} />
//                                         </div>
//                                     </List.Item>
//                                 )}
//                             />
//                         </Card>
//                     </TabPane>
//                     <TabPane tab="Resources" key="4">
//                         <Card title="Class Resources">
//                             <List
//                                 dataSource={classResources}
//                                 renderItem={(item) => (
//                                     <List.Item>
//                                         <List.Item.Meta
//                                             avatar={<BookOutlined />}
//                                             title={item.name}
//                                             description={item.type}
//                                         />
//                                     </List.Item>
//                                 )}
//                             />
//                         </Card>
//                     </TabPane>
//                     <TabPane tab="Reports" key="5">
//                         <Card title="Class Progress & Reports">
//                             <Title level={4}>Overall Class Performance</Title>
//                             {/* <Column
//                                 data={performanceData}
//                                 xField="assignment"
//                                 yField="avgScore"
//                                 color="#722ed1"
//                             /> */}
//                             <Title level={4} style={{ marginTop: '24px' }}>Recent Activity Logs</Title>
//                             <List
//                                 dataSource={[
//                                     { icon: <CalendarOutlined />, text: "New assignment 'Project 3' added on 2023-10-15" },
//                                     { icon: <UserOutlined />, text: "2 new students enrolled on 2023-10-12" },
//                                     { icon: <FileTextOutlined />, text: "Mid-term grades posted on 2023-10-10" },
//                                 ]}
//                                 renderItem={(item) => (
//                                     <List.Item>
//                                         {item.icon} {item.text}
//                                     </List.Item>
//                                 )}
//                             />
//                         </Card>
//                     </TabPane>
//                 </Tabs>
//             </Content>
//         </Layout>
//     );
// }

import React, { useState } from 'react';
import {
    Layout, Typography, Card, Avatar, Tag, Tabs, Row, Col,
    Progress, List, Table, Badge, Statistic,
} from 'antd';
import {
    UserOutlined, CalendarOutlined, BookOutlined,
    FileTextOutlined, BellOutlined
} from '@ant-design/icons';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const { Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

// Mock data
const classInfo = {
    name: "Advanced Web Development",
    code: "WEB301",
    schedule: "Mon, Wed, Fri 10:00 AM - 12:00 PM",
    startDate: "2023-09-01",
    endDate: "2023-12-15",
};

const trainerInfo = {
    name: "Dr. Jane Smith",
    email: "jane.smith@example.com",
    courses: ["HTML/CSS", "JavaScript", "React"],
};

const studentInfo = {
    totalStudents: 25,
    students: [
        { name: "Alice Johnson", email: "alice@example.com", status: "Active" },
        { name: "Bob Williams", email: "bob@example.com", status: "Inactive" },
    ],
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
    const [activeTab, setActiveTab] = useState("1");

    const studentColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
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
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
            ),
        },
    ];

    return (
        <Layout>
            <Content style={{ padding: '24px' }}>
                <Title level={2}>{classInfo.name}</Title>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={16}>
                        <Card title="Class Information">
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <Statistic title="Class Code" value={classInfo.code} />
                                </Col>
                                <Col span={12}>
                                    <Statistic title="Schedule" value={classInfo.schedule} />
                                </Col>
                                <Col span={12}>
                                    <Statistic title="Start Date" value={classInfo.startDate} />
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
                                    <Text strong>{trainerInfo.name}</Text>
                                    <br />
                                    <Text type="secondary">{trainerInfo.email}</Text>
                                </div>
                            </div>
                            <div>
                                <Text strong>Assigned Courses:</Text>
                                <br />
                                {trainerInfo.courses.map((course, index) => (
                                    <Tag key={index} color="blue">{course}</Tag>
                                ))}
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ marginTop: '24px' }}>
                    <TabPane tab="Overview" key="1">
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
                    </TabPane>
                    <TabPane tab="Students" key="2">
                        <Card title={`Student Information (Total: ${studentInfo.totalStudents})`}>
                            <Table dataSource={studentInfo.students} columns={studentColumns} />
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
                    </TabPane>
                    <TabPane tab="Assignments" key="3">
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
                    </TabPane>
                    <TabPane tab="Resources" key="4">
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
                    </TabPane>
                    <TabPane tab="Reports" key="5">
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
                    </TabPane>
                </Tabs>
            </Content>
        </Layout>
    );
}