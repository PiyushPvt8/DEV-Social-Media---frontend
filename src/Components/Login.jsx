import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      console.log(res.data);
      return navigate("/");

    } catch (err) {
      console.log(err.response);
      console.log(err.response?.data);
      console.log(err.response?.status);
    }
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center bg-base-100">
      <div className="card w-96 bg-neutral text-neutral-content shadow-2xl border border-neutral-content/10">
        <div className="card-body">
          <h2 className="card-title text-3xl justify-center mb-4">Login</h2>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-neutral-content">
              Email
            </legend>

            <input
              type="email"
              className="input input-bordered w-full bg-base-100 text-base-content"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset mt-3">
            <legend className="fieldset-legend text-neutral-content">
              Password
            </legend>

            <input
              type="password"
              className="input input-bordered w-full bg-base-100 text-base-content"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>

          <div className="card-actions mt-6">
            <button className="btn btn-primary w-full" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
