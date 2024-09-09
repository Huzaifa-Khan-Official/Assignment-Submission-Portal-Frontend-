import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './Pages/Login.jsx';
import Signup from './Pages/Signup.jsx';
import NotFoundPage from './Pages/NotFoundPage.jsx';
import User from './Context/Context.js';
import LoaderContext from "./Context/LoaderContext.js";
import { useState } from 'react';
import ErrorBoundary from './Components/ErrorBoundary.jsx';
import Sidebar from './Components/Sidebar.jsx';
import StudentSettingPage from './Pages/Students/StudentSettingPage.jsx';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard.jsx';
import AllTeachers from './Components/AllTeachers/AllTeachers.jsx';
import AllStudents from './Components/AllStudents/AllStudents.jsx';
import StudentDetail from './Components/StudentDetail/StudentDetail.jsx';
import StudentReportGenerate from './Components/StudentReportGenerate/StudentReportGenerate.jsx';
import TrainerDashboard from './Pages/Trainer/TrainerDashboard.jsx';
import UpdateProfilePage from './Components/UpdateProfilePage.jsx';
import TrainerSettingPage from './Pages/Trainer/TrainerSettingPage.jsx';
import StudentAssignmentDetailPage from './Pages/Students/StudentAssignmentDetailPage.jsx';
import ClassDetailDashboard from './Pages/Students/ClassDetailDashboard.jsx';
import TrainerClassDetailDashboard from './Pages/Trainer/TrainerClassDetailDashboard.jsx';
import AssignmentSubmissions from './Components/AssignmentSubmissions.jsx';
import AdminSettingPage from './Pages/Admin/AdminSettingPage.jsx';
import AdminTrainerDetailPage from './Pages/Admin/AdminTrainerDetailPage.jsx';
import AccountVerification from './Pages/AccountVerification.jsx';
import TrainerClassDetailPage from './Pages/Admin/TrainerClassDetailPage.jsx';
import AssignmentDetailPage from './Pages/Trainer/AssignmentDetailPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "*",
    element: <NotFoundPage />
  },
  // Admin Routes
  {
    path: "/admin/dashboard",
    element: <>
      <Sidebar title="Admin | Dashboard">
        <AdminDashboard />
      </Sidebar>
    </>
  },
  // admin trainer routes
  {
    path: "/admin/teachers",
    element: <>
      <Sidebar title="Admin | Teachers">
        <AllTeachers />
      </Sidebar>
    </>
  },
  {
    path: "/admin/trainer/:trainerId",
    element: <>
      <Sidebar title="Admin | Trainer">
        <AdminTrainerDetailPage />
      </Sidebar>
    </>
  },
  {
    path: "/admin/trainer/:trainerId/:classId",
    element: <>
      <Sidebar title="Admin | Trainer | Class">
        <TrainerClassDetailPage />
      </Sidebar>
    </>
  },
  {
    path: "/admin/assignments/:teacherID",
    element: <>
      <Sidebar title="Admin | Teachers">
        <h1>All Assignements Listing page</h1>
      </Sidebar>
    </>
  },
  // admin student routes
  {
    path: "/admin/students",
    element: <>
      <Sidebar title="Admin | Students">
        <AllStudents />
      </Sidebar>
    </>
  },
  {
    path: "/admin/student/:studentId",
    element: <>
      <Sidebar title="Admin | Student">
        <StudentDetail />
      </Sidebar>
    </>
  },
  {
    path: "/admin/student/:studentId/:classId",
    element: <>
      <Sidebar title="Admin | Student Report">
        <StudentReportGenerate />
      </Sidebar>
    </>
  },
  {
    path: "/admin/profile",
    element: <>
      <Sidebar title="Admin | Profile">
        <UpdateProfilePage />
      </Sidebar>
    </>
  },
  {
    path: "/admin/settings",
    element: <>
      <Sidebar title="Admin | Settings">
        <AdminSettingPage />
      </Sidebar>
    </>
  },

  // Trainer Routes
  {
    path: "/trainer/dashboard",
    element: <>
      <Sidebar title="Trainer | Dashboard">
        <TrainerDashboard />
      </Sidebar>
    </>
  },
  {
    path: "/trainer/class/:classId",
    element: <>
      <Sidebar title="Trainer | Class Detail">
        <TrainerClassDetailDashboard />
      </Sidebar>
    </>
  },
  {
    path: "/trainer/class/:classId/:assignmentId",
    element: <>
      <Sidebar title="Trainer | Submissions">
        <AssignmentDetailPage />
      </Sidebar>
    </>
  },
  {
    path: "/trainer/class/:classId/:assignmentId/submissions",
    element: <>
      <Sidebar title="Trainer | Submissions">
        <AssignmentSubmissions />
      </Sidebar>
    </>
  },
  {
    path: "/trainer/class/:classId/student/:studentId",
    element: <>
      <Sidebar title="Trainer | Student Report">
        <StudentReportGenerate />
      </Sidebar>
    </>
  },
  {
    path: "/trainer/profile",
    element: <>
      <Sidebar title="Trainer | Profile">
        <UpdateProfilePage />
      </Sidebar>
    </>
  },
  {
    path: "/trainer/settings",
    element: <>
      <Sidebar title="Trainer | Profile">
        <TrainerSettingPage />
      </Sidebar>
    </>
  },
  // Student Routes
  {
    path: "/student/class/:classId",
    element: <>
      <Sidebar title="Student | Class Detail">
        <ClassDetailDashboard />
      </Sidebar>
    </>
  },
  {
    path: "/student/class/:classId/:assignmentId",
    element: <>
      <Sidebar title="Student | Assignment">
        <StudentAssignmentDetailPage />
      </Sidebar>
    </>
  },
  {
    path: "/settings",
    element: <>
      <Sidebar title="Student | Setting">
        <StudentSettingPage />
      </Sidebar>
    </>
  },
  {
    path: "/student/profile",
    element: <>
      <Sidebar title="Student | Profile">
        <UpdateProfilePage />
      </Sidebar>
    </>
  },
  {
    path: "/student/:classId/:studentId/report",
    element: <>
      <Sidebar title="Student | Report">
        <StudentReportGenerate />
      </Sidebar>
    </>
  },
  {
    path: "/account-verification",
    element: <>
      <AccountVerification />
    </>
  },

])

function Main() {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(false);

  return (
    <User.Provider value={{ user, setUser }}>
      <LoaderContext.Provider value={{ loader, setLoader }}>
        <RouterProvider router={router} />
      </LoaderContext.Provider>
    </User.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
