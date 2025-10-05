import React from "react";
import {
	Route,
	Routes,
	Navigate,
	useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Header from "./components/Header";
import AccountPage from "./pages/AccountPage";
import PostItemPage from "./pages/PostItemPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import ProductPage from "./pages/ProductPage";
import ListedItemsPage from "./pages/ListedItemsPage";
import "./App.css";

function App() {
	const location = useLocation();
	const showHeader = !["/login", "/signup"].includes(location.pathname);

	return (
		<div className='App'>
			{showHeader && <Header />}
			<Routes>
				<Route
					path='/login'
					element={
						<PublicRoute>
							<Login />
						</PublicRoute>
					}
				/>
				<Route
					path='/signup'
					element={
						<PublicRoute>
							<SignUp />
						</PublicRoute>
					}
				/>
				<Route
					path='/home'
					element={
						<PrivateRoute>
							<HomePage />
						</PrivateRoute>
					}
				/>
				<Route
					path='/search/:keyword'
					element={
						<PrivateRoute>
							<SearchResultsPage />
						</PrivateRoute>
					}
				/>
				<Route
					path='/account'
					element={
						<PrivateRoute>
							<AccountPage />
						</PrivateRoute>
					}
				/>
				<Route
					path='/post-item'
					element={
						<PrivateRoute>
							<PostItemPage />
						</PrivateRoute>
					}
				/>
				<Route
					path='/product/:id'
					element={
						<PrivateRoute>
							<ProductPage />
						</PrivateRoute>
					}
				/>
				<Route
					path='/listed-items'
					element={
						<PrivateRoute>
							<ListedItemsPage />
						</PrivateRoute>
					}
				/>
				<Route path='/' element={<Navigate to='/home' replace />} />
			</Routes>
		</div>
	);
}

export default App;