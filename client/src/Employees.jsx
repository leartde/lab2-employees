import {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const fetchEmployees = async() => {
            const url = 'http://localhost:5047/api/employees';
            try {
                const res = await axios.get(url);
                setEmployees(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchEmployees();
    }, [index]);

    const handleDelete = async (id) => {
        try {
            const url = `http://localhost:5047/api/employees?id=${id}`;
            const res = await axios.delete(url);
            setIndex(index + 1);
            console.log(res);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="w-full p-8 m-0">
            <h1 className="text-3xl text-green-400 font-bold "> Employees</h1>
            <table className="min-w-full mt-4 divide-y divide-gray-200" >
                <thead className="bg-gray-50">
                   <tr>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Is Active</th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Actions</th>
                   </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.fullName}</td>
                            <td>{employee.isActive ? 'Yes' : 'No'}</td>
                            <td className="space-x-4">
                                <Link to={`/contracts/${employee.id}`} className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Contracts</Link>
                                <button onClick={()=>handleDelete(employee.id)} className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

                <div className="mt-4 flex flex-col gap-2 text-white font-semibold w-48 text-center">
                    <Link className=" bg-green-400 p-2 rounded-lg" to="employees/create"> Add an employee </Link>
                    <Link className=" bg-gray-400 p-2 rounded-lg" to="contracts"> View all contracts </Link>
                </div>



        </div>
    );
};

export default Employees;
