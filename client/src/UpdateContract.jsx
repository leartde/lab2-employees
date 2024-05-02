import {useLoaderData, useNavigate} from "react-router-dom";
import { useState} from "react";
import axios from "axios";

const UpdateContract = () => {
    const contract = useLoaderData();
    const [name, setName] = useState(contract.name)
    const [startDate, setStartDate] = useState(contract.startDate);
    const navigate = useNavigate();

    const formatDate = (date) => {
        const newDate = new Date(date);

        const year = newDate.getFullYear();
        const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
        const day = String(newDate.getDate()).padStart(2, '0');

        const hours = String(newDate.getHours()).padStart(2, '0');
        const minutes = String(newDate.getMinutes()).padStart(2, '0');
        const seconds = String(newDate.getSeconds()).padStart(2, '0');
        const milliseconds = String(newDate.getMilliseconds()).padStart(3, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedStartDate = formatDate(startDate);
        let url = `http://localhost:5047/api/contracts?id=${contract.id}&name=${name}&startDate=${formattedStartDate}`;
        try {
            const res = await axios.put(url);
            console.log(res);
            navigate('/contracts')
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="w-full m-0 p-4">
            <form method="post" onSubmit={handleSubmit} className="w-1/2 flex flex-col gap-2">
                <label htmlFor="contract" className="text-blue-400 text-lg text-semibold">Id</label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="contract"
                    value={contract.id}
                    disabled/>
                <label htmlFor="name" className="text-blue-400 text-lg text-semibold">Name</label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    />
                <label htmlFor="startDate" className="text-blue-400 text-lg text-semibold">Start Date</label>
                <input
                    type="date"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="startDate"
                    onChange={(e) => setStartDate(e.target.value)}
                    value={startDate}
                    />
                <label htmlFor="employeeId" className="text-blue-400 text-lg text-semibold">Employee Id</label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="employeeId"
                    value={contract.employeeId}
                    disabled
                    />

                <button type="submit" className="text-lg text-white bg-green-400 p-4">
                    Update
                </button>

            </form>

        </div>
    );
};

export default UpdateContract;
