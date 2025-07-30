import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleSave = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 2000);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  return (
    <>
      <div className="flex justify-center ">
        <div className="flex justify-center mx-10 ">
          <fieldset className="fieldset bg-stone-400 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Edit Profile</legend>

            <label className="label">First Name</label>
            <input
              type="text"
              className="input"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label">Last Name</label>
            <input
              type="text"
              className="input"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <label className="label">Gender</label>
            <input
              type="text"
              className="input"
              placeholder="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />

            <label className="label">About</label>
            <input
              type="text"
              className="input"
              placeholder="Tell us about yourself"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />

            <label className="label">PhotoUrl</label>
            <input
              type="text"
              className="input"
              placeholder="Photo URL"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
            <label className="label">Age</label>
            <input
              type="text"
              className="input"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <button onClick={handleSave} className="btn btn-secondary mt-4">
              Save Profile
            </button>
          </fieldset>
        </div>

        <UserCard
          user={{
            _id: user._id,
            firstName,
            lastName,
            age,
            gender,
            about,
            photoUrl,
          }}
        />
      </div>
      {show && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Updated Successfully !</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
