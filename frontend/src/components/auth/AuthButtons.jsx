import React from "react";
import { Link } from "react-router-dom";
import "./AuthButtons.css";

const AuthButtons = ({ isSignUp, loading }) => {
	return (
		<div className={`auth-buttons${isSignUp ? "-signup" : ""}`}>
			<Link
				to={isSignUp ? "/login" : "/signup"}
				className='secondary-auth-btn'
			>
				{isSignUp ? "ALREADY HAVE AN ACC?" : "CREATE ACCOUNT"}
			</Link>
			<button type='submit' className='main-auth-btn' disabled={loading}>
				{isSignUp ? "SIGN UP" : "SIGN IN"}
			</button>
		</div>
	);
};

export default AuthButtons;
