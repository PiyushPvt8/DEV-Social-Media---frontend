import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addUser } from "../utils/userSlice";
import { clearFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Common fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Signup fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");

  // UI state
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setError("");
      setIsLoading(true);

      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(res.data));

      // Prevent another account from using stale feed data
      dispatch(clearFeed());

      navigate("/feed");
    } catch (err) {
      setError(
        err?.response?.data ||
          "An error occurred during login.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setError("");
      setIsLoading(true);

      const skillsArray = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          email,
          password,
          age: Number(age),
          photoURL,
          gender,
          about,
          skills: skillsArray,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(res.data));

      // New account should always start with fresh feed state
      dispatch(clearFeed());

      navigate("/profile");
    } catch (err) {
      setError(
        err?.response?.data ||
          "An error occurred during signup.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoginForm) {
      await handleLogin();
    } else {
      await handleSignUp();
    }
  };

  const handleToggleForm = () => {
    setIsLoginForm((currentValue) => !currentValue);

    // Remove previous API error when changing forms
    setError("");
  };

  return (
    <div
      className={`flex w-full flex-1 justify-center bg-base-100 px-4 ${
        isLoginForm
          ? "items-center py-4"
          : "items-start py-3"
      }`}
    >
      <div
        className={`card w-full border border-neutral-content/10 bg-neutral text-neutral-content shadow-2xl transition-all duration-300 ${
          isLoginForm ? "max-w-md" : "max-w-3xl"
        }`}
      >
        <form
          className={`card-body ${
            isLoginForm
              ? "p-5 sm:p-6"
              : "gap-1 p-4 sm:p-5"
          }`}
          onSubmit={handleSubmit}
        >
          <h2 className="mb-1 text-center text-3xl font-bold">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>

          <div
            className={
              isLoginForm
                ? "grid grid-cols-1 gap-x-4"
                : "grid grid-cols-1 gap-x-5 sm:grid-cols-2"
            }
          >
            {!isLoginForm && (
              <>
                {/* First Name */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-neutral-content">
                    First Name
                  </legend>

                  <input
                    type="text"
                    className="input input-bordered w-full bg-base-100 text-base-content"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) =>
                      setFirstName(e.target.value)
                    }
                    required
                  />
                </fieldset>

                {/* Last Name */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-neutral-content">
                    Last Name
                  </legend>

                  <input
                    type="text"
                    className="input input-bordered w-full bg-base-100 text-base-content"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) =>
                      setLastName(e.target.value)
                    }
                    required
                  />
                </fieldset>
              </>
            )}

            {/* Email */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-neutral-content">
                Email
              </legend>

              <input
                type="email"
                className="input input-bordered w-full bg-base-100 text-base-content"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />
            </fieldset>

            {/* Password */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-neutral-content">
                Password
              </legend>

              <input
                type="password"
                className="input input-bordered w-full bg-base-100 text-base-content"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />
            </fieldset>

            {!isLoginForm && (
              <>
                {/* Age */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-neutral-content">
                    Age
                  </legend>

                  <input
                    type="number"
                    className="input input-bordered w-full bg-base-100 text-base-content"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) =>
                      setAge(e.target.value)
                    }
                    min="18"
                    required
                  />
                </fieldset>

                {/* Gender */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-neutral-content">
                    Gender
                  </legend>

                  <input
                    type="text"
                    className="input input-bordered w-full bg-base-100 text-base-content"
                    placeholder="Enter your gender"
                    value={gender}
                    onChange={(e) =>
                      setGender(e.target.value)
                    }
                    required
                  />
                </fieldset>

                {/* Photo URL */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-neutral-content">
                    Photo URL
                  </legend>

                  <input
                    type="url"
                    className="input input-bordered w-full bg-base-100 text-base-content"
                    placeholder="Enter your photo URL"
                    value={photoURL}
                    onChange={(e) =>
                      setPhotoURL(e.target.value)
                    }
                  />
                </fieldset>

                {/* Skills */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-neutral-content">
                    Skills
                  </legend>

                  <input
                    type="text"
                    className="input input-bordered w-full bg-base-100 text-base-content"
                    placeholder="React, Node.js, MongoDB"
                    value={skills}
                    onChange={(e) =>
                      setSkills(e.target.value)
                    }
                  />
                </fieldset>

                {/* About */}
                <fieldset className="fieldset sm:col-span-2">
                  <legend className="fieldset-legend text-neutral-content">
                    About
                  </legend>

                  <textarea
                    className="textarea textarea-bordered h-16 min-h-16 w-full resize-none bg-base-100 text-base-content"
                    placeholder="Tell us something about yourself"
                    value={about}
                    onChange={(e) =>
                      setAbout(e.target.value)
                    }
                  />
                </fieldset>
              </>
            )}
          </div>

          {error && (
            <p className="mt-1 text-center text-sm text-error">
              {typeof error === "string"
                ? error
                : error.message || "Something went wrong."}
            </p>
          )}

          <div className="card-actions mt-2">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>

                  {isLoginForm
                    ? "Logging in..."
                    : "Creating account..."}
                </>
              ) : isLoginForm ? (
                "Login"
              ) : (
                "Sign Up"
              )}
            </button>
          </div>

          <button
            type="button"
            className="cursor-pointer py-1 text-center text-sm transition-opacity hover:opacity-70"
            onClick={handleToggleForm}
            disabled={isLoading}
          >
            {isLoginForm
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;