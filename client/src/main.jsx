import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";import Employees from "./Employees.jsx";
import Contracts from "./Contracts.jsx";
import AddEmployee from "./AddEmployee.jsx";
import AddContract from "./AddContract.jsx";
import UpdateContract from "./UpdateContract.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Employees/>,
    },
    {
        path:"/contracts/:id",
        element: <Contracts/>,
        loader:({params}) => fetch(`http://localhost:5047/api/employees/${params.id}`)
    },
    {
        path: "/contracts",
        element: <Contracts/>,
    },
    {
        path: "/employees/create",
        element: <AddEmployee/>,
    },
    {
        path:"/contracts/create",
        element: <AddContract/>
    },
    {
        path:"/contracts/:id/update",
        element: <UpdateContract/>,
        loader:({params}) => fetch(`http://localhost:5047/api/contracts/${params.id}`)
    }

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
