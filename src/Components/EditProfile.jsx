import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const EditProfile = () => {
  const user = useSelector((state) => state.user);

  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [photoURL, setPhotoURL] = useState(user.photoURL || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills || []);

  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);

  const handleProfileEdit = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          photoURL,
          gender,
          about,
          skills,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(res?.data?.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 1000);
    } catch (err) {
      setError(err?.response?.data || "Unable to update profile.");
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age || "");
      setPhotoURL(user.photoURL || "");
      setGender(user.gender || "");
      setAbout(user.about || "");
      setSkills(user.skills || []);
    }
  }, []);

  return (
    <div>
      <main className="w-full bg-base-100 px-4 pt-6 pb-28">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-8 lg:flex-row lg:items-center">
          {/* EDIT PROFILE CARD */}
          <div className="card w-full max-w-sm bg-neutral text-neutral-content shadow-xl">
            <div className="card-body gap-3 p-5">
              <h2 className="mb-1 text-center text-2xl font-bold">
                Edit Profile
              </h2>

              {/* FIRST NAME + LAST NAME */}
              <div className="grid grid-cols-2 gap-3">
                <label className="form-control">
                  <span className="mb-1 text-sm font-medium">First Name</span>

                  <input
                    type="text"
                    className="input input-bordered input-sm w-full bg-base-100 text-base-content"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>

                <label className="form-control">
                  <span className="mb-1 text-sm font-medium">Last Name</span>

                  <input
                    type="text"
                    className="input input-bordered input-sm w-full bg-base-100 text-base-content"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <label className="form-control">
                  <span className="mb-1 text-sm font-medium">Age</span>

                  <input
                    type="number"
                    className="input input-bordered input-sm w-full bg-base-100 text-base-content"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>

                <label className="form-control">
                  <span className="mb-1 text-sm font-medium">Gender</span>

                  <select
                    className="select select-bordered select-sm w-full bg-base-100 text-base-content"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>

              <label className="form-control">
                <span className="mb-1 text-sm font-medium">Photo URL</span>

                <input
                  type="text"
                  className="input input-bordered input-sm w-full bg-base-100 text-base-content"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                />
              </label>

              <label className="form-control">
                <span className="mb-1 text-sm font-medium">About</span>

                <textarea
                  rows="2"
                  className="textarea textarea-bordered textarea-sm w-full resize-none bg-base-100 text-base-content"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>

              <label className="form-control">
                <span className="mb-1 text-sm font-medium">Skills</span>

                <input
                  type="text"
                  className="input input-bordered input-sm w-full bg-base-100 text-base-content"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </label>

              {error && <p className="text-sm text-error">{error}</p>}

              <div className="mt-2 grid grid-cols-2 gap-3">
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => navigate("/profile")}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleProfileEdit}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* USER CARD PREVIEW */}
          <div className="w-full max-w-sm">
            <UserCard
              user={{
                firstName,
                lastName,
                age,
                photoURL,
                gender,
                about,
                skills,
              }}
            />
          </div>
        </div>
      </main>
      {toast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Changes saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default EditProfile;
