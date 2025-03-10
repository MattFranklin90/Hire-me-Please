import React, { useState } from "react";
import "../UserProfile.css"; // This moves up one level from components to src

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    resume: "resume.pdf",
    profilePicture: "https://via.placeholder.com/150", // Placeholder profile pic
  });

  const handleEdit = () => {
    alert("Edit Profile Clicked! Add form functionality here.");
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Profile</h1>
      
      <div className="profile-card">
        {/* Profile Picture */}
        <div className="profile-picture">
          <img src={user.profilePicture} alt="Profile" />
        </div>

        {/* User Details */}
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Resume:</strong> <a href={user.resume} download>Download</a></p>
          
          {/* Edit Profile Button */}
          <button className="edit-button" onClick={handleEdit}>Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
