import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import "./PostItemPage.css";

const PostItemPage = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [image, setImage] = useState("");
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("image", file);
		setUploading(true);

		try {
			const config = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};

			const { data } = await axios.post("/api/upload", formData, config);

			setImage(data);
			setUploading(false);
		} catch (error) {
			console.error(error);
			setUploading(false);
		}
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess(false);

		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
			};

			const { data } = await axios.post(
				"/api/items",
				{ name, description, price, image },
				config
			);

			console.log("Item posted successfully:", data);
			setSuccess(true);
			setTimeout(() => {
				navigate("/");
			}, 2000); // Redirect after 2 seconds
		} catch (err) {
			setError(err.response?.data?.message || "Failed to post item.");
			console.error("Post item error:", err);
		}
	};

	return (
		<div className='post-item-page'>
			<h1>Post a New Item</h1>
			{success && <p className='success-message'>Item posted successfully!</p>}
			{error && <p className='error-message'>{error}</p>}
			<form onSubmit={submitHandler}>
				<div className='form-group'>
					<label>Name</label>
					<input
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
				<div className='form-group'>
					<label>Description</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					></textarea>
				</div>
				<div className='form-group'>
					<label>Price</label>
					<input
						type='number'
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						required
					/>
				</div>
				<div className='form-group'>
					<label>Image</label>
					<input
						type='text'
						value={image}
						onChange={(e) => setImage(e.target.value)}
						required
					/>
					<input type='file' onChange={uploadFileHandler} />
					{uploading && <p>Uploading...</p>}
				</div>
				<button type='submit' className='btn-submit'>
					Post Item
				</button>
			</form>
		</div>
	);
};

export default PostItemPage;
