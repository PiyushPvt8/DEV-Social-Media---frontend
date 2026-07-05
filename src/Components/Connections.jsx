import React , {useEffect} from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';


const Connections = () => {
    const [error, setError] = React.useState("");
    const dispatch = useDispatch();
    const connections = useSelector((state) => state.connections);


    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true,
            });
            dispatch(addConnections(res.data));
        } catch (error) {
            setError("Failed to fetch connections" + (error.response?.data || ""));
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) {
        return;
    }
    if (connections.length === 0) {
        return <div>No connections found.</div>;
    }

  return (
    <div className="text-center my-10">
        <h1 className="text-bold text-white text-3xl">Connections</h1>
        {connections.map((connection) => {
            const { firstName, lastName, photoURL, age, gender, about } = connection;
            return (
                <div key={connection._id} className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto shadow-lg">
                    <div>
                    <img alt="Profile" src={photoURL} className="w-20 h-20 rounded-full mr-4" /> 
                    </div> 
                    <div className="text-left mx-4">
                        <h2 className="text-xl font-bold">{firstName + " " + lastName}</h2>
                        {age && gender && <p>{age + " " + gender}</p>}
                        {about && <p>{about}</p>}
                    </div>
                </div>
            );
        })}
    </div>
  )
}

export default Connections