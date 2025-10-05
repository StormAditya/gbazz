import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import ProfileSection from "../components/account/ProfileSection";
import ContactSection from "../components/account/ContactSection";
import AccountSection from "../components/account/AccountSection";
import UserInfoSection from "../components/account/UserInfoSection";
import "./AccountPage.css";

const AccountPage = () => {
	const { user, logout } = useContext(AuthContext);

	return (
		<div className='account-page'>
			<div className='main-content'>
				<div className='left-panel'>
					<ProfileSection user={user} onLogout={logout} />
					<ContactSection />
				</div>
				<div className='right-panel'>
					<AccountSection />
					<div className='bottom-section'>
						<UserInfoSection user={user} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountPage;
