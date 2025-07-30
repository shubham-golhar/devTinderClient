import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlie";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store?.feed);

  const getFeed = async () => {
    try {
      if (feed && feed.length > 0) return; // already loaded
      const response = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(response.data.data));
    } catch (error) {
      console.error("Error fetching feed:", error);
      alert("Failed to fetch feed. Please try again later.");
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) {
    return (
      <div className="text-center my-30">
        <span className="loading loading-spinner loading-lg text-secondary"></span>
      </div>
    );
  }

  if (feed.length === 0) {
    return (
      <div className="text-center my-30">
        <div
          className="tooltip tooltip-open tooltip-secondary"
          data-tip="No feed available at the moment."
        >
          <button className="btn btn-secondary">Refresh to check again</button>
        </div>
      </div>
    );
  }

  return <div>{feed && <UserCard user={feed[0]} />}</div>;
};

export default Feed;
