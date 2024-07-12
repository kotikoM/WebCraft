import React from "react";
import "../styles/profile.css";

const Profile = () => {
  return (
    <div className="card">
      <img src="https://via.placeholder.com/150" alt="Profile" className="card-img" />
      <h2 className="card-title">John Doe</h2>
      <p className="card-username">@johndoe</p>
      <p className="card-email">john.doe@example.com</p>
      <p className="card-description">Software Engineer at ABC Corp</p>
      <a href="https://www.example.com" className="card-link">Visit Profile</a>
    </div>
  );
};

export default Profile;
