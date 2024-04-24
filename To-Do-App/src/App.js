import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { loadUser } from "./actions/authAction";
import RegisterScreen from "./components/auth/RegisterScreen";
import LoginScreen from "./components/auth/LoginScreen";
import PrivateRoute from "./components/routing/PrivateRoute";

import "./App.css";
import FormTodo from "./components/FormTodo";

function App() {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<Routes>
					<Route
						exact
						path="/register/"
						element={<RegisterScreen />}
					/>
					<Route exact path="/login/" element={<LoginScreen />} />
					<Route path="/" element={<PrivateRoute />}>
						<Route path="/" element={<FormTodo />}></Route>
					</Route>
				</Routes>
			</Router>
		</Provider>
	);
}

export default App;
