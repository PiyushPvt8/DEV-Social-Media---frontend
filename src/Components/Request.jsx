import React, { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../utils/requestSlice';


const Request = () => {
    const [error, setError] = React.useState("");
    const dispatch = useDispatch();
    const request = useSelector((state) => state.request);

    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post(
                BASE_URL + "/request/review/" + status + "/" + _id,
                {},
                {
                    withCredentials: true,
                }
            );
            dispatch(removeRequest(_id));
        } catch (error) {
            setError("Failed to review request" + (error.response?.data || ""));
        }
    };

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/request/received", {
                withCredentials: true,
            });
            dispatch(addRequest(res.data));

        } catch (error) {
            setError("Failed to fetch requests" + (error.response?.data || ""));
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!request) {
        return;
    }
    if (request.length === 0) {
        return <div>No requests found.</div>;
    }

    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-white text-3xl">Requests</h1>
            {request.map((request) => {
                const { firstName, lastName, photoURL, age, gender, about } = request.fromUserId;
                return (
                    <div key={request._id} className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto shadow-lg">
                        <div>
                            <img alt="Profile" src={photoURL} className="w-20 h-20 rounded-full mr-4" />
                        </div>
                        <div className="text-left mx-4">
                            <h2 className="text-xl font-bold">{firstName + " " + lastName}</h2>
                            {age && gender && <p>{age + " " + gender}</p>}
                            {about && <p>{about}</p>}
                        </div>
                        <div>
                            <button className="btn btn-active btn-success mx-2" onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
                            <button className="btn btn-active btn-error mx-2" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Request