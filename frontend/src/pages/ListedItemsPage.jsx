import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import "./ListedItemsPage.css";

const ListedItemsPage = () => {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const { user } = useContext(AuthContext);

	useEffect(() => {
		const fetchUserItems = async () => {
			try {
				const config = {
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				};
				const { data } = await axios.get("/api/items/myitems", config);
				setItems(data);
				setLoading(false);
			} catch (err) {
				setError("Could not fetch your items.");
				setLoading(false);
			}
		};

		if (user) {
			fetchUserItems();
		}
	}, [user]);

	const handleRemoveItem = async (itemId) => {
		if (window.confirm("Are you sure you want to remove this item?")) {
			try {
				const config = {
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				};
				await axios.delete(`/api/items/${itemId}`, config);
				setItems(items.filter((item) => item._id !== itemId));
			} catch (err) {
				setError("Could not remove the item.");
			}
		}
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p className='error-message'>{error}</p>;

	return (
		<div className='listed-items-page'>
			<h1>Previous Sales</h1>
			<div className='items-list'>
				{items.map((item) => (
					<div key={item._id} className='item-card'>
						<img src={item.image} alt={item.name} className='item-image' />
						<div className='item-info'>
							<p className='item-date'>
								Placed on {new Date(item.createdAt).toLocaleDateString("en-GB", {
									day: "numeric",
									month: "long",
								})}
							</p>
							<p className='item-name'>Product Name: {item.name}</p>
							<p className='item-purchases'>Purchases: </p>
						</div>
						<div className='item-actions'>
							<Link to={`/edit-item/${item._id}`} className='btn-edit'>
								EDIT ITEM
							</Link>
							<button
								onClick={() => handleRemoveItem(item._id)}
								className='btn-remove'
							>
								REMOVE ITEM
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ListedItemsPage;
