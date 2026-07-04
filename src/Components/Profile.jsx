import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DEFAULT_AVATAR } from "../utils/constants";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <main className="w-full bg-base-100 px-4 pt-6 pb-28">
      <div className="mx-auto flex max-w-sm justify-center">

        <div className="card w-full overflow-hidden border border-neutral-content/10 bg-neutral text-neutral-content shadow-xl">

          <figure className="pt-5">
            <div className="avatar">
              <div className="h-24 w-24 rounded-full bg-base-100 ring-2 ring-primary ring-offset-2 ring-offset-neutral">
                <img
                  src={user.photoURL || DEFAULT_AVATAR}
                  alt="User Profile"
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = DEFAULT_AVATAR;
                  }}
                />
              </div>
            </div>
          </figure>

          <div className="card-body gap-3 p-5">

            <div className="text-center">
              <h1 className="text-2xl font-bold">
                {user.firstName} {user.lastName}
              </h1>

              {user.about && (
                <p className="mt-1 text-sm leading-relaxed text-neutral-content/70">
                  {user.about}
                </p>
              )}
            </div>

            <div className="space-y-2">
              {user.email && (
                <div className="flex items-center justify-between gap-3 rounded-lg bg-base-100/10 px-3 py-2">
                  <span className="text-sm font-semibold">Email</span>

                  <span className="min-w-0 truncate text-sm text-neutral-content/80">
                    {user.email}
                  </span>
                </div>
              )}

              {user.age && (
                <div className="flex items-center justify-between rounded-lg bg-base-100/10 px-3 py-2">
                  <span className="text-sm font-semibold">Age</span>

                  <span className="text-sm text-neutral-content/80">
                    {user.age}
                  </span>
                </div>
              )}

              {user.gender && (
                <div className="flex items-center justify-between rounded-lg bg-base-100/10 px-3 py-2">
                  <span className="text-sm font-semibold">Gender</span>

                  <span className="text-sm capitalize text-neutral-content/80">
                    {user.gender}
                  </span>
                </div>
              )}
            </div>

  
            {user.skills?.length > 0 && (
              <div>
                <h2 className="mb-2 text-sm font-semibold">Skills</h2>

                <div className="flex flex-wrap gap-1.5">
                  {user.skills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="badge badge-primary badge-outline badge-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* EDIT PROFILE BUTTON */}
            <button
              className="btn btn-primary btn-sm mt-2 w-full"
              onClick={() => navigate("/profile/edit")}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
