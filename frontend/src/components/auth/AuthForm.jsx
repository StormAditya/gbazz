import React from "react";
import "./AuthForm.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AuthForm = ({
	isSignUp,
	name,
	setName,
	email,
	setEmail,
	password,
	setPassword,
	showPassword,
	setShowPassword,
	handleSubmit,
	loading,
	error,
}) => {
	return (
		<form onSubmit={handleSubmit}>
			{isSignUp && (
				<div className='form-group'>
					<label htmlFor='name'>Name:</label>
					<input
						type='text'
						id='name'
						placeholder='Enter your name'
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
			)}
			<div className='form-group'>
				<label htmlFor='email'>User ID:</label>
				<input
					type='email'
					id='email'
					placeholder='SIT mail'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</div>

			<div className='form-group'>
				<label htmlFor='password'>Password:</label>
				<div className='password-input-container'>
					<input
						type={showPassword ? "text" : "password"}
						id='password'
						placeholder='Enter your password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button
						type='button'
						className='password-toggle-icon'
						onClick={() => setShowPassword((prev) => !prev)}
						aria-label={showPassword ? "Hide password" : "Show password"}
					>
						{showPassword ? <FaEyeSlash /> : <FaEye />}
					</button>
				</div>
			</div>

			{error && (
				<p className='error-message' style={{ color: "red" }}>
					{error}
				</p>
			)}
			{loading && <p>Loading...</p>}
		</form>
	);
};

export default AuthForm;
