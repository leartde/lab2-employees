
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const AddEmployee = () => {
    const  [firstName, setFirstName] = useState('');
    const  [lastName, setLastName] = useState('');
    const navigate = useNavigate();
    const FormData = {
        fullName : firstName + ' ' + lastName,
        isActive : false
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const url = 'http://localhost:5047/api/employees';
            const res = await axios.post(url, FormData);
            console.log(res);

        }
        catch (err) {
            console.error(err);
        }
        navigate('/');
    }
    return (
        <div className="w-full p-12 m-0">
            <form className="border border-gray-500 p-8 w-1/3 rounded-xl" method="submit" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="firstName"
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Add Employee
                    </button>
                </div>
            </form>
            
        </div>
    );
};

export default AddEmployee;
