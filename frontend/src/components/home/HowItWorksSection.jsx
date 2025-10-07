import React from "react";
import "./HowItWorksSection.css";

const HowItWorksSection = () => {
	return (
		<div className='how-it-works-section'>
			<h2>How It Works</h2>
			<p>Selling and buying second-hand items has never been easier. Follow these simple steps to get started.</p>
			<div className='steps-container'>
				<div className='step'>
					<div className='step-number'>1</div>
					<h3>Post your Ad</h3>
					<p>Create a listing with photos and details of your item in minutes.</p>
				</div>
				<div className='step'>
					<div className='step-number'>2</div>
					<h3>Connect with Buyers</h3>
					<p>Chat directly with interested buyers and negotiate the best price.</p>
				</div>
			</div>
		</div>
	);
};

export default HowItWorksSection;
