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
		<div className='post-item-container'>
			<div className='post-item-card'>
				<h1 className='post-item-title'>Post a New Item</h1>
				{success && (
					<p className='success-message'>
						Item posted successfully! Redirecting...
					</p>
				)}
				{error && <p className='error-message'>{error}</p>}
				<form onSubmit={submitHandler} className='post-item-form'>
					<div className='form-group'>
						<label htmlFor='name'>Name</label>
						<input
							id='name'
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							placeholder='e.g., Vintage Leather Jacket'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='description'>Description</label>
						<textarea
							id='description'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
							placeholder='Describe your item in detail'
						></textarea>
					</div>
					<div className='form-group'>
						<label htmlFor='price'>Price</label>
						<input
							id='price'
							type='number'
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							required
							placeholder='e.g., 99.99'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='image-upload'>Image</label>
						<div className='image-upload-wrapper'>
							<input
								id='image-url'
								type='text'
								value={image}
								onChange={(e) => setImage(e.target.value)}
								placeholder='Or enter image URL'
								className='image-url-input'
							/>
							<label htmlFor='image-upload-file' className='btn-upload'>
								Choose File
								<input
									id='image-upload-file'
									type='file'
									onChange={uploadFileHandler}
									className='file-input'
								/>
							</label>
						</div>
						{uploading && <p className='uploading-message'>Uploading...</p>}
						{image && (
							<div className='image-preview'>
								<img src={image} alt='Item Preview' />
							</div>
						)}
					</div>
					<button type='submit' className='btn-submit' disabled={uploading}>
						{uploading ? "Please wait..." : "Post Item"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default PostItemPage;
