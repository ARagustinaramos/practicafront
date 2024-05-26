import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import SearchBar from "./components/searchBar/SearchBar";
import Home from "./views/home/Home";
import Detail from "./views/detail/Detail";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Form from "./components/form/Form";
import About from "./views/about/About";
import Cart from "./views/cart/Cart";
import { saveCartToLocalStorage } from "../src/redux/reducer/localStorageHelpers";
import DashboardAdmin from "./views/dashboard/admin/DashboardAdmin";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
function App() {
	const cartItems = useSelector((state) => state.items);

	useEffect(() => {
		saveCartToLocalStorage(cartItems);
	}, [cartItems]);
	const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

	useEffect(() => {
		const registerUser = async () => {
			if (isAuthenticated) {
				try {
					const token = await getAccessTokenSilently();
					const response = await axios.post(
						`http://localhost:3001/users`,
						{
							name: user.name,
							email: user.email,
							picture: user.picture
						},
						{
							headers: {
								Authorization: `Bearer ${token}`,
								"Content-Type": "application/json"
							}
						}
					);
					console.log("Usuario registrado: ", response.data);
				} catch (error) {
					console.log(error.message);
				}
			}
		};
		registerUser();
	}, [isAuthenticated, getAccessTokenSilently, user]);
	return (
		<>
			<Navbar />

			<Routes>
				{/*
        <Route path="/" element={<Landing></Landing>}></Route>
        
        <Route path="/create" element={<Create></Create>}></Route>
        <Route path={`/detail/:id`} element={<Detail />}></Route>        
      */}
				<Route path="/" element={<Home />}></Route>
				<Route path="/cart" element={<Cart />}></Route>
				<Route path="/form" element={<Form />}></Route>
				<Route path={`/detail/:id`} element={<Detail />}></Route>
				<Route path="/about" element={<About />}></Route>
				<Route path="/dashboardadmin" element={<DashboardAdmin />}></Route>
			</Routes>
			<Footer />
		</>
	);
}

export default App;
