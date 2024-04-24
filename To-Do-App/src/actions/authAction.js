import axios from "axios";
import { returnErrors } from "./errorAction";
import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	CLEAR_PROFILE,
	USER_LOADED,
	AUTH_ERROR,
} from "./types";

export const loadUser = () => async (dispatch, getState) => {
	const token = getState().auth.token;
	const config = {
		headers: {},
	};

	if (token) {
		config.headers["x-auth-token"] = token;
	}

	try {
		const res = await axios.get("http://localhost:5000/api/auth", config);

		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

// Register User
export const register =
	({ name, email, password }) =>
	(dispatch) => {
		// Headers
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		// Request body
		const body = JSON.stringify({ name, email, password });

		axios
			.post("http://localhost:5000/api/auth/users", body, config)
			.then((res) =>
				dispatch({
					type: REGISTER_SUCCESS,
					payload: res.data,
				})
			)
			.catch((err) => {
				dispatch(
					returnErrors(
						err.response.data,
						err.response.status,
						"REGISTER_FAIL"
					)
				);
				dispatch({
					type: REGISTER_FAIL,
				});
			});
	};

// Login User
export const login =
	({email, password }) =>
	(dispatch) => {
		// Headers
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		// Request body
		const body = JSON.stringify({  email, password });

		axios
			.post("http://localhost:5000/api/auth", body, config)
			.then((res) =>
				dispatch({
					type: LOGIN_SUCCESS,
					payload: res.data,
				})
			)
			.catch((err) => {
				dispatch(
					returnErrors(
						err.response.data,
						err.response.status,
						"LOGIN_FAIL"
					)
				);
				dispatch({
					type: LOGIN_FAIL,
				});
			});
	};

// Logout User
export const logout = () => (dispatch) => {
	dispatch({ type: CLEAR_PROFILE });
	dispatch({ type: LOGOUT_SUCCESS });
};