import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './Pages/Login.jsx';
import Signup from './Pages/Signup.jsx';
import NotFoundPage from './Pages/NotFoundPage.jsx';
import User from './Context/Context.js';
import { useState } from 'react';
import ErrorBoundary from './Components/ErrorBoundary.jsx';
import Sidebar from './Components/Sidebar.jsx';
import PageTitle from './Components/PageTitle.jsx';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard.jsx';
import StudentHomePage from './Pages/Students/StudentHomePage.jsx';


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
  {
    path: "/admin/dashboard",
    element: <>
      <PageTitle title="Admin | Dashboard" />
      <Sidebar>
        {/* <h1>Admin | Dashboard</h1> */}
        {/* <AdminDashboard /> */}
        <StudentHomePage />
      </Sidebar>
    </>
  }

])

function Main() {
  const [user, setUser] = useState(null);

  return (
    <User.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </User.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
