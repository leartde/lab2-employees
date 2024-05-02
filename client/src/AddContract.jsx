import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const AddContract = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [employeeId, setEmployeeId] = useState(0);
    const [employees, setEmployees] = useState([]);
    const FormData = {
        name: name,
        startDate: startDate,
        employeeId: employeeId
    };

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
    }, []);

    const handleIdChange = (e) => {
        setEmployeeId(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'http://localhost:5047/api/contracts';
            const res = await axios.post(url, FormData);
            console.log(res);
            navigate('/contracts');
        } catch (err) {
            console.error(err);
    }
    }


    return (
        <div>
            <div className="w-full p-12 m-0">
                <form className="border border-gray-500 p-8 rounded-lg w-1/3" method="submit" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                            Start Date
                        </label>
                        <input
                            className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="startDate"
                            type="date"
                            placeholder="Start Date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employeeId">
                            Employee
                        </label>
                        <select className="p-2 bg-white shadow-xl border border-gray-500"  onChange={handleIdChange}
                            value={employeeId}>
                            <option value={""}>Select Employee</option>

                            {employees.map((employee) => (
                                <option onSelect={handleIdChange} key={employee.id} value={employee.id}>{employee.fullName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Add Contract
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddContract;
