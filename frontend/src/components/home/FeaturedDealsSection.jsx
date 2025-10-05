import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./FeaturedDealsSection.css";

const FeaturedDealsSection = ({ keyword }) => {
	const [items, setItems] = useState([]);

	useEffect(() => {
		const fetchItems = async () => {
			const { data } = await axios.get(`/api/items?keyword=${keyword || ""}`);
			setItems(data);
		};
		fetchItems();
	}, [keyword]);

	return (
		<div className='featured-deals-section'>
			<div className='section-header'>
				<h2>Featured Deals</h2>
				<Link to='/search/'>View All →</Link>
			</div>
			<p>Handpicked items from trusted sellers</p>
			<div className='deals-grid'>
				{items.map((item) => (
										<Link to={`/product/${item._id}`} key={item._id} className='deal-card-link'>
						<div className='deal-card'>
							<div className='deal-image'>
								<img src={item.image} alt={item.name} />
							</div>
							<h3>{item.name}</h3>
							<p className='deal-price'>${item.price}</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default FeaturedDealsSection;
