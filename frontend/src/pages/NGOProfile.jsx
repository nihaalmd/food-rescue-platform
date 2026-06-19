import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/profile.css";

function NGOProfile() {

const [profile, setProfile] = useState(null);

useEffect(() => {
fetchProfile();
}, []);

const fetchProfile = async () => {


try {

  const token =
    localStorage.getItem("token");

  const response =
    await axios.get(
      "http://localhost:5000/api/auth/me",
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  setProfile(
    response.data.user
  );

} catch (error) {

  console.log(error);

}


};

if (!profile) {
return ( <div className="profile-page"> <Navbar /> <div className="profile-container"> <h2>Loading Profile...</h2> </div> </div>
);
}

return (


<div className="profile-page">

  <Navbar />

  <div className="profile-container">

    <h1>NGO Profile</h1>

    <div className="profile-card">

      <div className="profile-field">
        <label>NGO Name</label>
        <p>{profile.name}</p>
      </div>

      <div className="profile-field">
        <label>Email</label>
        <p>{profile.email}</p>
      </div>

      <div className="profile-field">
        <label>Role</label>
        <p>
          {profile.role
            .charAt(0)
            .toUpperCase() +
            profile.role.slice(1)}
        </p>
      </div>

      <div className="profile-field">
        <label>Member Since</label>
        <p>
          {new Date(
            profile.createdAt
          ).toLocaleDateString()}
        </p>
      </div>

    </div>

  </div>

</div>


);
}

export default NGOProfile;
