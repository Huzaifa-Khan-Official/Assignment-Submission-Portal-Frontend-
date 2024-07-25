import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Avatar,
  Statistic,
  Descriptions,
  Menu,
  Layout,
} from "antd";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { ResponsiveContainer } from "recharts";
import smitlogo from './smitlogo.png'; // Assuming you have your logo image imported correctly
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

// Mock student data
const studentsData = [
  {
    name: "Tayyab Yaqoob",
    rollNumber: "WMA-132511",
    batch: "Batch 10",
    assignments: [
      { title: "Assignment 1", points: 80, status: "submitted" },
      { title: "Assignment 2", points: 70, status: "not_submitted" },
      { title: "Assignment 3", points: 90, status: "submitted" },
      { title: "Assignment 4", points: 85, status: "submitted" },
      { title: "Assignment 5", points: 60, status: "not_submitted" },
    ],
  },
  {
    name: "Huzaifa Khan",
    rollNumber: "WMA-132611",
    batch: "Batch 10",
    assignments: [
      { title: "Assignment 1", points: 75, status: "submitted" },
      { title: "Assignment 2", points: 65, status: "pending" },
      { title: "Assignment 3", points: 85, status: "submitted" },
      { title: "Assignment 4", points: 80, status: "submitted" },
      { title: "Assignment 5", points: 55, status: "submitted" },
    ],
  },
  {
    name: "Muhammad Noman",
    rollNumber: "WMA-132531",
    batch: "Batch 10",
    assignments: [
      { title: "Assignment 1", points: 70, status: "submitted" },
      { title: "Assignment 2", points: 60, status: "pending" },
      { title: "Assignment 3", points: 80, status: "submitted" },
      { title: "Assignment 4", points: 75, status: "not_submitted" },
      { title: "Assignment 5", points: 50, status: "not_submitted" },
    ],
  },
  {
    name: "Jamsheed khan",
    rollNumber: "WMA-131181",
    batch: "Batch 10",
    assignments: [
      { title: "Assignment 1", points: 70, status: "submitted" },
      { title: "Assignment 2", points: 60, status: "pending" },
      { title: "Assignment 3", points: 80, status: "pending" },
      { title: "Assignment 4", points: 75, status: "submitted" },
      { title: "Assignment 5", points: 50, status: "not_submitted" },
    ],
  },
];

const { Title } = Typography;
const { Header, Content, Sider } = Layout;

const StudentReportGenerate = () => {
  // State to manage selected student index
  const [selectedStudentIndex, setSelectedStudentIndex] = useState(0);
  const navigate = useNavigate();

  // Function to calculate and set chart data
  const calculateChartData = (studentIndex) => {
    const student = studentsData[studentIndex];
    const submitted = student.assignments.filter((a) => a.status === "submitted").length;
    const pending = student.assignments.filter((a) => a.status === "pending").length;
    const notSubmitted = student.assignments.filter((a) => a.status === "not_submitted").length;

    return [
      { name: "Submitted", value: submitted },
      { name: "Pending", value: pending },
      { name: "Not Submitted", value: notSubmitted },
    ];
  };

  // Calculate chart data on component mount or student change
  useEffect(() => {
    calculateChartData(selectedStudentIndex);
  }, [selectedStudentIndex]);

  // Function to calculate average grade
  const calculateAverageGrade = (studentIndex) => {
    const student = studentsData[selectedStudentIndex];
    const totalPoints = student.assignments.reduce((total, a) => total + a.points, 0);
    const earnedPoints = student.assignments.reduce(
      (total, a) =>
        a.status === "submitted" || a.status === "pending" ? total + a.points : total,
      0
    );
    return ((earnedPoints / totalPoints) * 100 || 0).toFixed(2);
  };

  // Function to handle student selection
  const handleStudentSelect = (studentIndex) => {
    setSelectedStudentIndex(studentIndex);
  };

  // Stock chart options
  const stockChartOptions = {
    rangeSelector: {
      selected: 1,
    },
    title: {
      text: 'Assignment Grades Over Time',
    },
    series: [{
      name: 'Grades',
      data: studentsData[selectedStudentIndex].assignments.map((assignment, index) => [index, assignment.points]),
      tooltip: {
        valueDecimals: 2,
      },
    }],
  };

  return (
    <>
      <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
        <div className="site-layout-background" style={{ padding: 24 }}>
          <Title level={2}><ArrowLeftOutlined className='hover:bg-gray-300 p-2 rounded-full' title='Back to Previous' onClick={() => navigate(-1)} /> Student Report</Title>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={6}>
                    <Avatar
                      size={64}
                      src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
                    />
                  </Col>
                  <Col xs={24} sm={18}>
                    <Descriptions title="Student Information" column={1}>
                      <Descriptions.Item label="Name">
                        {studentsData[selectedStudentIndex].name}
                      </Descriptions.Item>
                      <Descriptions.Item label="Roll Number">
                        {studentsData[selectedStudentIndex].rollNumber}
                      </Descriptions.Item>
                      <Descriptions.Item label="Batch">
                        {studentsData[selectedStudentIndex].batch}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card title="Assignment Status">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={calculateChartData(selectedStudentIndex)}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {calculateChartData(selectedStudentIndex).map(
                        (entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              index === 0
                                ? "#82ca9d"
                                : index === 1
                                  ? "#ffc658"
                                  : "#ff7300"
                            }
                          />
                        )
                      )}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card title="Assignment Grades">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={studentsData[selectedStudentIndex].assignments}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="title" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="points" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col xs={24}>
              <Card title="Overall Grade">
                <Statistic
                  title="Average Grade"
                  value={`${calculateAverageGrade(selectedStudentIndex)}%`}
                  precision={2}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card title="Assignment Grades Over Time">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={studentsData[selectedStudentIndex].assignments}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="title" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="points" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card title="Assignment Performance Radar Chart">
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart
                    outerRadius={90}
                    data={studentsData[selectedStudentIndex].assignments.map(
                      (assignment) => ({
                        subject: assignment.title,
                        points: assignment.points,
                      })
                    )}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar
                      name="Assignment"
                      dataKey="points"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col xs={24}>
              <Card title="Assignment Grades Stock Chart">
                <HighchartsReact
                  highcharts={Highcharts}
                  constructorType={"stockChart"}
                  options={stockChartOptions}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </>
  );
};

export default StudentReportGenerate;
