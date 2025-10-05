import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
	return (
		<div className='hero-section'>
			<div className='hero-content'>
				<h1>Buy & Sell Second-Hand Items Easily</h1>
				<p>Find the best deals from students and local sellers</p>
				<div className='hero-buttons'>
					<button className='btn-primary'>Start Browsing</button>
					<button className='btn-secondary'>Post Your Items</button>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;
