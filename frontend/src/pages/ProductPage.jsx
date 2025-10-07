import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaArrowRight, FaUserCircle } from "react-icons/fa";
import "./ProductPage.css";

const ProductPage = () => {
	const [item, setItem] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const { id } = useParams();

	useEffect(() => {
		const fetchItem = async () => {
			try {
				const { data } = await axios.get(`/api/items/${id}`);
				setItem(data);
				setLoading(false);
			} catch (err) {
				setError("Product not found");
				setLoading(false);
			}
		};

		fetchItem();
	}, [id]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div className='error-message'>{error}</div>;
	}

	return (
		<div className='product-page'>
			<div className='product-container'>
				<div className='product-image-gallery'>
					<button className='gallery-arrow left-arrow'>
						<FaArrowLeft />
					</button>
					<img src={item.image} alt={item.name} className='product-main-image' />
					<button className='gallery-arrow right-arrow'>
						<FaArrowRight />
					</button>
				</div>
				<div className='product-details'>
					<h1>{item.name}</h1>
					<p className='product-price'>Rs. {item.price}</p>
					<p className='product-description'>{item.description}</p>
					<div className='seller-info'>
						<h3>About the seller</h3>
						<div className='seller-details'>
							<FaUserCircle className='seller-avatar' />
							<div className='seller-text'>
								<p className='seller-name'>{item.user ? item.user.name : "Unknown Seller"}</p>
							</div>
						</div>
						<p className='seller-address'>
							Address: {item.user?.addresses?.[0] || "Address not available"}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductPage;
