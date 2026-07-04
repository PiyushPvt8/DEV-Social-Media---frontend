import React from "react";

const UserCard = ({ user }) => {
  if (!user) return null;

  const { firstName, lastName, photoURL, age, gender, about, skills } = user;

  return (
    <div className="card w-full max-w-sm overflow-hidden border border-neutral-content/10 bg-neutral text-neutral-content shadow-xl">
      <figure className="h-56 w-full bg-base-200">
        <img
          src={photoURL}
          alt={firstName}
          className="h-full w-full object-contain"
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
          <button className="btn btn-outline btn-error btn-sm">Ignore</button>

          <button className="btn btn-primary btn-sm">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
