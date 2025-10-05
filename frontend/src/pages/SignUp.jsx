import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import AuthForm from "../components/auth/AuthForm";
import AuthHeader from "../components/auth/AuthHeader";
import AuthButtons from "../components/auth/AuthButtons";
import "./SignUp.css";

const SignUp = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { login } = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const { data } = await axios.post(
				"/api/users/register",
				{ name, email, password },
				config
			);
			login(data);
			console.log("Sign up successful:", data);
		} catch (err) {
			setError(err.response?.data?.message || "Sign up failed. Please try again.");
			console.error("Sign up error:", err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='auth-container'>
			<div className='auth-card'>
				<AuthHeader />
				<form onSubmit={handleSubmit}>
					<AuthForm
						isSignUp={true}
						name={name}
						setName={setName}
						email={email}
						setEmail={setEmail}
						password={password}
						setPassword={setPassword}
						showPassword={showPassword}
						setShowPassword={setShowPassword}
						error={error}
						loading={loading}
					/>
					<AuthButtons isSignUp={true} loading={loading} />
				</form>
			</div>
		</div>
	);
};

export default SignUp;
