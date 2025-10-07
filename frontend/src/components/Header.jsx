import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaUser, FaPlus } from "react-icons/fa";
import "./Header.css";

const Header = () => {
	const [keyword, setKeyword] = useState("");
	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			navigate(`/search/${keyword}`);
		} else {
			navigate("/");
		}
	};

	return (
		<header className='header'>
			<div className='header-left'>
				<Link to='/' className='logo'>
					GBazz
				</Link>
			</div>
			<div className='header-center'>
				<form onSubmit={submitHandler}>
					<input
						type='text'
						name='q'
						onChange={(e) => setKeyword(e.target.value)}
						placeholder='Search for item..'
					/>
					<button type='submit'>
						<FaSearch />
					</button>
				</form>
			</div>
			<div className='header-right'>
				<Link to='/account'>
					<FaUser className='icon' />
				</Link>
			</div>
		</header>
	);
};

export default Header;
