import React, { useState, useEffect } from "react";
import { Row, Col, Card, Typography, Avatar, Statistic, Descriptions, Spin, Alert, Tag, } from "antd";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from "recharts";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";

const { Title } = Typography;

const StudentReportGenerate = () => {
  const [studentData, setStudentData] = useState(null);
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { studentId, classId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reportsResponse = await api.get(`/api/assignments/class/${classId}/student/${studentId}/reports`);
        const infoResponse = await api.get(`/api/users/student/${studentId}`);
        setStudentData(reportsResponse.data);
        setStudentInfo(infoResponse.data);
      } catch (err) {
        setError("Failed to fetch student data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId, classId]);

  if (loading) {
    return (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "57%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <Alert message="Error" className="m-5 me-3 p-3" description={error} type="error" showIcon />;
  }

  if (studentData.length == 0) {
    return (
      <div className="p-4">
        <Alert message="No Reports" description="No student report data available." type="info" showIcon />
      </div>
    );
  }

  if (!studentData || studentData.length === 0) {
    return (
      <div className="p-6">
        <Title level={2} className="mb-6">
          <ArrowLeftOutlined
            className="mr-4 cursor-pointer hover:text-blue-500"
            onClick={() => navigate(-1)}
          />
          Student Report
        </Title>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card>
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24} sm={6}>
                  <Avatar
                    size={96}
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                </Col>
                <Col xs={24} sm={18}>
                  <h3 className="text-lg font-bold">Student Information</h3>
                  <div className="flex flex-col gap-3 mt-2 pt-3 border-t-2">
                    <div className="flex gap-3 flex-col xsm:flex-row">
                      <p className="text-gray-400">Name:</p>
                      <p className="capitalize ">{studentInfo?.username || "N/A"}</p>
                    </div>
                    <div className="flex gap-3 flex-col xsm:flex-row">
                      <p className="text-gray-400">Roll Number:</p>
                      <p className="capitalize ">{rollNumber}</p>
                    </div>
                    <div className="flex gap-3 flex-col xsm:flex-row">
                      <p className="text-gray-400">Class ID:</p>
                      <p className="capitalize ">{classId.substring(0, 6)}</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Alert
          message="No Submissions"
          description="No student report data available."
          type="info"
          showIcon
          className="mt-6"
        />
      </div>
    );
  }

  const calculateChartData = () => {
    const submitted = studentData.filter((a) => a.submitted).length;
    const notSubmitted = studentData.filter((a) => !a.submitted).length;

    return [
      { name: "Submitted", value: submitted },
      { name: "Not Submitted", value: notSubmitted },
    ];
  };

  const calculateAverageGrade = () => {
    const totalMarks = studentData.reduce((total, a) => total + (a.marks || 0), 0);
    const totalPossibleMarks = studentData.reduce((total, a) => total + a.totalMarks, 0);
    const average = ((totalMarks / totalPossibleMarks) * 100 || 0).toFixed(2);

    if (average >= 90) {
      return "A+";
    } else if (average >= 85) {
      return "A";
    } else if (average >= 80) {
      return "A-";
    } else if (average >= 75) {
      return "B+";
    } else if (average >= 70) {
      return "B";
    } else if (average >= 65) {
      return "B-";
    } else if (average >= 60) {
      return "C+";
    } else if (average >= 55) {
      return "C";
    } else if (average >= 50) {
      return "C-";
    } else {
      return "F";
    }
  };

  const rollNumber = studentId.substring(0, 6);

  return (
    <div className="p-6 pe-2">
      <Title level={2} className="mb-6">
        <ArrowLeftOutlined
          className="mr-4 cursor-pointer hover:text-blue-500"
          onClick={() => navigate(-1)}
        />
        Student Report
      </Title>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={6} className="flex justify-center">
                <Avatar
                  size={96}
                  src={studentInfo?.profileImg ? studentInfo.profileImg : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}
                />
              </Col>
              <Col xs={24} sm={18}>
                <h3 className="text-lg font-bold">Student Information</h3>
                <div className="flex flex-col gap-3 mt-2 pt-3 border-t-2">
                  <div className="flex gap-3 flex-col xsm:flex-row">
                    <p className="text-gray-400">Name:</p>
                    <p className="capitalize ">{studentInfo?.username || "N/A"}</p>
                  </div>
                  <div className="flex gap-3 flex-col xsm:flex-row">
                    <p className="text-gray-400">Roll Number:</p>
                    <p className="capitalize ">{rollNumber}</p>
                  </div>
                  <div className="flex gap-3 flex-col xsm:flex-row">
                    <p className="text-gray-400">Class ID:</p>
                    <p className="capitalize ">{classId.substring(0, 6)}</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        {studentData.length > 0 && (
          <>
            <Col xs={24} md={12}>
              <Card title="Assignment Status">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={calculateChartData()}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      <Cell key="cell-0" fill="#82ca9d" />
                      <Cell key="cell-1" fill="#ff7300" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="Assignment Grades">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={studentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="assignmentTitle" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="marks" fill="#8884d8" name="Marks" />
                    <Bar dataKey="totalMarks" fill="#82ca9d" name="Total Marks" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col xs={24}>
              <Card title="Overall Grade">
                <Statistic
                  title="Grade"
                  value={calculateAverageGrade()}
                />
              </Card>
            </Col>
            <Col span={24}>
              <Card title="Assignment Details">
                {studentData.map((assignment) => (
                  <Card
                    key={assignment.assignmentId}
                    type="inner"
                    title={
                      <div className="flex justify-between flex-wrap gap-3 py-3">
                        {assignment.assignmentTitle}
                        <Tag color={assignment.submitted ? "green" : "red"}>
                          {assignment.submitted ? "Submitted" : "Not Submitted"}
                        </Tag>
                      </div>
                    }
                    className="mb-4 break-words"
                  >
                    <p>Total Marks: {assignment.totalMarks}</p>
                    {assignment.submitted && (
                      <>
                        <p>Submission Date: {new Date(assignment.submissionDate).toLocaleDateString()}</p>
                        <p>Marks: {assignment.marks}</p>
                        <p>Rating: {assignment.rating}</p>
                        <p>Remark: {assignment.remark}</p>
                      </>
                    )}
                  </Card>
                ))}
              </Card>
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default StudentReportGenerate;