import React from "react";
import "./ProfileSection.css";

const ProfileSection = ({ user, onLogout }) => {
	return (
		<div className='profile-section card'>
			<div className='profile-pic'></div>
			<h2>{user ? user.name : "Guest"}</h2>
			<button onClick={onLogout} className='logout-btn'>
				LOG OUT
			</button>
		</div>
	);
};

export default ProfileSection;
