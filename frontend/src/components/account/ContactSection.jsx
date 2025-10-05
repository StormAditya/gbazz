import React from "react";
import "./ContactSection.css";

const ContactSection = () => {
	return (
		<div className='contact-section card'>
			<h3>Contact Us</h3>
			<p>Connect with us on the following platforms.</p>
			<ul>
				<li>
					<span>📧</span> gbazz@gmail.com
				</li>
				<li>
					<span>📞</span> +91 9203714927
				</li>
				<li>
					<span>📷</span> @gbazz-symbi
				</li>
				<li>
					<span>💬</span> +91 8039156564
				</li>
			</ul>
		</div>
	);
};

export default ContactSection;
