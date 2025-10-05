import React from "react";
import "./CategoriesSection.css";

const categories = [
	{ name: "Electronics", icon: "🎧" },
	{ name: "Furniture", icon: "🛋️" },
	{ name: "Books", icon: "📚" },
	{ name: "Vehicles", icon: "🚲" },
	{ name: "More", icon: "🔍" },
];

const CategoriesSection = () => {
	return (
		<div className='categories-section'>
			<h2>Browse Categories</h2>
			<p>Find exactly what you're looking for</p>
			<div className='categories-grid'>
				{categories.map((category) => (
					<div key={category.name} className='category-card'>
						<div className='category-icon'>{category.icon}</div>
						<p>{category.name}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default CategoriesSection;
