import React from "react";
import { useParams } from "react-router-dom";
import HeroSection from "../components/home/HeroSection";
import CategoriesSection from "../components/home/CategoriesSection";
import FeaturedDealsSection from "../components/home/FeaturedDealsSection";
import HowItWorksSection from "../components/home/HowItWorksSection";

import "./HomePage.css";

const HomePage = () => {
	const { keyword } = useParams();

	return (
		<div className='home-page'>
			<HeroSection />
			<CategoriesSection />
			<FeaturedDealsSection keyword={keyword} />
			<HowItWorksSection />
		</div>
	);
};

export default HomePage;
