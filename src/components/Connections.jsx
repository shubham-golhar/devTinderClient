import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/conectionSlice";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const navigate = useNavigate();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });

      console.log("Connections data:", res.data.data);

      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
      alert("Failed to fetch connections. Please try again later.");
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  //   if (!connections) return;
  if (!connections || connections.length === 0)
    return (
      <div className="text-center my-30">
        <div
          className="tooltip tooltip-open tooltip-secondary"
          data-tip="Hello,No Connections found, Taking you to the feed !"
        >
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            Click Me
          </button>
        </div>
      </div>
    );

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
