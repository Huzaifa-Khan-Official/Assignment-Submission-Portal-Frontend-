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
import StudentAllAssignmentPage from './Pages/Students/StudentAllAssignmentPage.jsx';
import StudentAssignmentTodoPage from './Pages/Students/StudentAssignmentTodoPage.jsx';
import AllClassfellowsPage from './Pages/Students/AllClassfellowsPage.jsx';
import StudentSettingPage from './Pages/Students/StudentSettingPage.jsx';
import StudentUpdateProfilePage from './Pages/Students/StudentUpdateProfilePage.jsx';

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
        <h1>Admin Dashboard</h1>
      </Sidebar>
    </>
  },
  // Trainer Routes
  {
    path: "/trainer/dashboard",
    element: <>
      <Sidebar title="Trainer | Dashboard">
        <h1>Trainer Dashboard</h1>
      </Sidebar>
    </>
  },
  // Student Routes
  {
    path: "/student/assignments",
    element: <>
      <Sidebar title="Student | Assignments">
        <StudentAllAssignmentPage />
      </Sidebar>
    </>
  },
  {
    path: "/assignments/todo",
    element: <>
      <Sidebar title="Student | Assignments | TO-Do">
        <StudentAssignmentTodoPage />
      </Sidebar>
    </>
  },
  {
    path: "/classmates",
    element: <>
      <Sidebar title="Student | Classfellows">
        <AllClassfellowsPage />
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
        <StudentUpdateProfilePage />
      </Sidebar>
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
