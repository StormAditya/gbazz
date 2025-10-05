import React from "react";
import { Link } from "react-router-dom";
import "./AccountSection.css";

const AccountSection = () => {
	return (
		<div className='account-section card'>
			<h2>Profile</h2>
			<p>Our recommendations are tailored to you based on your profile choices.</p>
			<div className='account-options'>
				<Link to='/edit-user-info' className='option-link'>
					<div className='option'>
						<span>Edit User Info</span>
						<span>&gt;</span>
					</div>
				</Link>
				<Link to='/manage-addresses' className='option-link'>
					<div className='option'>
						<span>Manage Addresses</span>
						<span>&gt;</span>
					</div>
				</Link>
				<Link to='/previous-purchases' className='option-link'>
					<div className='option'>
						<span>Previous Purchases</span>
						<span>&gt;</span>
					</div>
				</Link>
				<Link to='/previous-sales' className='option-link'>
					<div className='option'>
						<span>Previous Sales</span>
						<span>&gt;</span>
					</div>
				</Link>
				<Link to='/listed-items' className='option-link'>
					<div className='option'>
						<span>Listed Items</span>
						<span>&gt;</span>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default AccountSection;
