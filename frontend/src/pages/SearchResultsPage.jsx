import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./SearchResultsPage.css";

const SearchResultsPage = () => {
	const { keyword } = useParams();
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchItems = async () => {
			try {
				setLoading(true);
				const { data } = await axios.get(`/api/items?keyword=${keyword}`);
				setItems(data);
				setLoading(false);
			} catch (err) {
				setError("Could not fetch search results.");
				setLoading(false);
			}
		};

		fetchItems();
	}, [keyword]);

	return (
		<div className='search-results-page'>
			<h1>Search Results</h1>
			{loading ? (
				<p>Loading...</p>
			) : error ? (
				<p className='error-message'>{error}</p>
			) : (
				<div className='results-list'>
					{items.map((item) => (
						<div key={item._id} className='result-item'>
							<img src={item.image} alt={item.name} className='item-image' />
							<div className='item-details'>
								<h2>{item.name}</h2>
								<p>Seller: {item.user.name}</p>
							</div>
							<Link to={`/product/${item._id}`} className='btn-view-item'>
								View Item
							</Link>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default SearchResultsPage;
