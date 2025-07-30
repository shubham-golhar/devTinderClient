import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";
const RequestPage = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const navigate = useNavigate();
  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/request/received`, {
        withCredentials: true,
      });
      console.log("Requests data:", response.data.data);
      dispatch(addRequest(response.data.data));
    } catch (error) {
      console.error("Error fetching requests:", error);
      alert("Failed to fetch requests. Please try again later.");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const reviewRequest = async (status, reqId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${reqId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(reqId));

      console.log("Request review response:", res.data.data);
    } catch (error) {
      console.error("Error reviewing request:", error);
      alert("Failed to review request. Please try again later.");
    }
  };

  if (!requests) return;

  if (requests.length === 0) {
    return (
      <div className="text-center my-30">
        <div
          className="tooltip tooltip-open tooltip-secondary"
          data-tip="Hello,No Requests found, Taking you to the feed !"
        >
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            Click Me
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="text-center my-10 items-center">
      <h1 className="text-bold text-white text-3xl">Friend Requests</h1>

      {requests?.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div className="flex gap-2 ">
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RequestPage;
