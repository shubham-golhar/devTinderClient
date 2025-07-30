import React from "react";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlie";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const UserCard = ({ user }) => {
  console.log("UserCard user:", user);
  const { _id, firstName, lastName, age, gender, photoUrl, about } = user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    console.log("Sending request with status:", status, "to userId:", userId);
    try {
      const response = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      console.log(response.data.data);
      dispatch(removeFeed(userId));
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Failed to send request. Please try again later.");
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-stone-300 w-96 shadow-sm">
        <figure>
          <img
            className="my-2 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover"
            src={photoUrl}
            alt="Photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>{" "}
          <p>{age && gender && age + " " + gender}</p>
          <p>{about}</p>
          <div className="card-actions justify-center my-5">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("intrested", _id)}
            >
              Intrested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
