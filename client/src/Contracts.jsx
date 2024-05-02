import {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useLoaderData} from "react-router-dom";

const Contracts = () => {
    const [contracts, setContracts] = useState([]);
    const [date, setDate] = useState(new Date())
    const [index, setIndex] = useState(0);
    const user = useLoaderData();

    useEffect(() => {
        const fetchContracts = async() => {
            let url = 'http://localhost:5047/api/contracts';
            if(user){
                url = `http://localhost:5047/api/contracts/employee?employeeId=${user.id}`;
            }
            try {
                const res = await axios.get(url);
                setContracts(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchContracts();
    }, [date, index, user]);
    const handleFilter = () =>{
        console.log("Filtering by date: ", date);
        contracts.map(contract => console.log(new Date(contract.startDate)));
        const filteredContracts = contracts.filter(contract => new Date(contract.startDate).toLocaleDateString() === new Date(date).toLocaleDateString());
        setContracts(filteredContracts);
    }

    const handleDelete = async (id) => {
        try{
            const url = `http://localhost:5047/api/contracts?id=${id}`;
            const res = await axios.delete(url);
            setIndex(index + 1);
            console.log(res);
            } catch (err) {
                console.error(err);
            }
    }
    return (
        <div className="w-full p-8 m-0">
            <h1 className="text-3xl text-green-400 font-bold "> Contracts</h1>
            <div className="flex flex-row gap-4">
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="shadow appearance-none border rounded w-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button onClick={handleFilter}
                    className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Filter
                </button>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full
                        Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Employee
                        Id
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Start
                        Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Actions</th>
                </tr>
                </thead>
                <tbody>
                {contracts.map((contract) => (
                    <tr key={contract.id}>
                        <td>{contract.id}</td>
                        <td>{contract.name}</td>
                        <td>{contract.employeeId}</td>
                        <td>{new Date(contract.startDate).toLocaleDateString()} </td>
                        <td className="space-x-4">
                            <Link to={`/contracts/${contract.id}/update`}
                                className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update
                            </Link>
                            <button
                                onClick={() => handleDelete(contract.id)}
                                className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="mt-4 flex flex-col gap-2 text-white font-semibold w-48 text-center">
                <Link className=" bg-green-400 p-2 rounded-lg" to="/contracts/create"> Create a contract </Link>
                <Link className=" bg-gray-400 p-2 rounded-lg" to="/"> View all employees </Link>
            </div>

        </div>
    );
};

export default Contracts;
