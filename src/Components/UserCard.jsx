import React from "react";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ user }) => {
  const [error, setError] = React.useState("");
  const { _id, firstName, lastName, photoURL, age, gender, about, skills } =
    user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      setError("Failed to send request" + (error.response?.data || ""));
    }
  };

  return (
    <div className="card w-full max-w-sm overflow-hidden border border-neutral-content/10 bg-neutral text-neutral-content shadow-xl">
      <figure className="h-56 w-full bg-base-200">
        <img
          src={photoURL}
          alt={firstName}
          className="h-full w-full object-contain"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://placehold.co/400x300?text=No+Image";
          }}
        />
      </figure>

      <div className="card-body gap-3 p-5">
        <div>
          <h2 className="text-xl font-bold">
            {firstName} {lastName}
          </h2>

          {(age || gender) && (
            <p className="mt-1 text-sm capitalize text-neutral-content/70">
              {age && `${age} years`}
              {age && gender && " · "}
              {gender}
            </p>
          )}
        </div>

        {about && (
          <p className="line-clamp-3 text-sm leading-relaxed text-neutral-content/80">
            {about}
          </p>
        )}

        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="badge badge-primary badge-outline badge-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="mt-2 grid grid-cols-2 gap-3">
          <button
            className="btn btn-outline btn-error btn-sm"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
