import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const fetchUser = async () => {
    if (user) return; // If user is already set, no need to fetch again
    try {
      const response = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(response.data.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      {" "}
      <NavBar />
      <Outlet /> {/* This will render the child routes like Login */}
      <Footer />
    </>
  );
};

export default Body;
