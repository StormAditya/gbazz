import React from "react";
import "./UserInfoSection.css";

const UserInfoSection = ({ user }) => {
	return (
		<div className='user-info-section card'>
			<h3>
				<span role='img' aria-label='user icon'>
					👤
				</span>{" "}
				User Info
			</h3>
			<p>
				<strong>Name :</strong> {user ? user.name : "Guest"}
			</p>
			<p>
				<strong>Phone :</strong> {user ? user.phone : ""}
			</p>
			<p>
				<strong>Batch :</strong> 2024-2028
			</p>
			<p>
				<strong>Gender :</strong> Male
			</p>
			<p>
				<strong>Birthday :</strong> 26/07/20026
			</p>
			<h3>
				<span role='img' aria-label='address icon'>
					🏠
				</span>{" "}
				Address
			</h3>
			<p>H.no. 24, Gate. No. 32</p>
			<p>Sus Gaon, Lavale, Tal: Mulshi</p>
			<p>Pune, Maharashtra</p>
			<p>Pin Code - 412512</p>
		</div>
	);
};

export default UserInfoSection;
