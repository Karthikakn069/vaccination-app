import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import LogHome from './pages/LogHome';
import Vaccination from './pages/Vaccination';
import VaccinationTable from "./pages/VaccinationTable";
import UserSlots from "./pages/UserSlots";
import CentreDetails from './pages/CentreDetails';
import Admin from './pages/Admin';
import CentreManagement from './pages/CentreManagement';
import UserManagement from './pages/UserManagement';
const router = createBrowserRouter([
  {
    path : '/',
    element : <App />,
    children : [
      {
        path : '/login',
        element : <Login />
      },
      {
        path : '/signup',
        element : <SignUp />
      },
    ]
  },
  {
    path :'/:mail',
    element : <LogHome />
  },
  {
    path :'/vaccination',
    element : <Vaccination />,
    children : [
      {
        path :'book_slots/:mail',
        element : <VaccinationTable />,
        children : [
          {
            path : 'centre_details/:id',
            element : <CentreDetails />,
          }
        ],
      },
      {
        path :'user_slots/:mail',
        element : <UserSlots />
      },
    ],
  },
  {
    path :'/admin',
    element : <Admin />,
    children :[
      {
        path :'centre_manage',
        element : <CentreManagement />
      },
      {
        path : 'user_manage',
        element : <UserManagement />
      },
    ]
  },
  // {
  //   path : '/vaccination_table/:mail',
  //   element : <Table />
  // },
  
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router= {router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
