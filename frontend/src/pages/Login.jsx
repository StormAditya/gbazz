import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import AuthForm from "../components/auth/AuthForm";
import AuthHeader from "../components/auth/AuthHeader";
import AuthButtons from "../components/auth/AuthButtons";
import "./Login.css";

const Login = () => {
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
			const { data } = await axios.post("/api/users/login", { email, password });
			login(data);
			console.log("Login successful:", data);
		} catch (err) {
			setError(err.response?.data?.message || "Login failed. Please try again.");
			console.error("Login error:", err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className='auth-page login-page'>
			<div className='auth-container'>
				<div className='auth-card'>
					<AuthHeader />
					<form onSubmit={handleSubmit}>
						<AuthForm
							email={email}
							setEmail={setEmail}
							password={password}
							setPassword={setPassword}
							showPassword={showPassword}
							setShowPassword={setShowPassword}
							error={error}
							loading={loading}
						/>
						<AuthButtons isSignUp={false} loading={loading} />
					</form>
					<Link to='/forgot-password' className='forgot-password'>
						FORGOT PASSWORD?
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Login;
