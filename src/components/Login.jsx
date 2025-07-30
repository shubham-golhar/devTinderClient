import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);

  const [isLoginForm, setIsLoginform] = useState(false);
  const navigate = useNavigate(); // React Router hook to navigate after login
  // Redux dispatch to update user state (to store user data)
  const dispatch = useDispatch(); // Redux dispatch to update user state (to store user data)
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      setError(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (error) {
      console.error("Error during signup:", error);
      setError(
        error?.response?.data?.message || "Sign up failed. Please try again."
      );
    }
  };
  return (
    <div className="flex justify-center my-30">
      <div className="card bg-stone-500  text-neutral-content w-96 ">
        <div className="card-body items-center text-center">
          <h2 className="card-title">
            {isLoginForm === true ? "Login!" : "Sign Up"}
          </h2>
          <fieldset className="fieldset">
            {!isLoginForm && (
              <>
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input text-red-900"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input text-red-900"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </>
            )}

            <legend className="fieldset-legend">What is your Email Id?</legend>
            <input
              type="text"
              className="input text-red-900"
              placeholder="Type here"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
            <legend className="fieldset-legend">Password?</legend>
            <input
              type="text"
              className="input text-red-900"
              placeholder="*****"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center">
              <button
                className="btn btn-primary"
                onClick={isLoginForm ? handleSubmit : handleSignup}
              >
                {isLoginForm ? "Login" : "Sign Up"}
              </button>
              <p
                className="m-auto cursor-pointer"
                onClick={() => setIsLoginform(!isLoginForm)}
              >
                {isLoginForm
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Login;
