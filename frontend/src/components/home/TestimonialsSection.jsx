import React from "react";
import "./TestimonialsSection.css";

const testimonials = [
	{ name: "AD", rating: 5 },
	{ name: "AP", rating: 5 },
	{ name: "AS", rating: 5 },
];

const TestimonialsSection = () => {
	return (
		<div className='testimonials-section'>
			<h2>Trusted by Students</h2>
			<p>See what our community members have to say about their experience</p>
			<div className='testimonials-grid'>
				{testimonials.map((testimonial, index) => (
					<div key={index} className='testimonial-card'>
						<div className='testimonial-rating'>
							{"★".repeat(testimonial.rating)}
						</div>
						<div className='testimonial-author'>
							<div className='author-initials'>{testimonial.name}</div>
						</div>
					</div>
				))}
			</div>
			<div className='trust-badge'>
				✔️ Trusted by 10,000+ students across universities
			</div>
		</div>
	);
};

export default TestimonialsSection;
