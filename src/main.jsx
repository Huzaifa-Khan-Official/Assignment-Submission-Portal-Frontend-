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
        <h1>Student | Assignments Listing Page</h1>
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
