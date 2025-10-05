import React from "react";
import "./UserInfoSection.css";

const UserInfoSection = ({ user }) => {
	return (
		<div className='user-info-section card'>
			<h2>User Info</h2>
			<div className='info-grid'>
				<span className='info-label'>Username</span>
				<span className='info-value'>{user?.name}</span>
				<span className='info-label'>Email</span>
				<span className='info-value'>{user?.email}</span>
				<span className='info-label'>Address</span>
				<span className='info-value'>
					{user?.addresses?.[0] || "No address set"}
				</span>
				<span className='info-label'>Phone Number</span>
				<span className='info-value'>xyz</span>
			</div>
		</div>
	);
};

export default UserInfoSection;
