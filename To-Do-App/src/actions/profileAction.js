import axios from "axios";
import { USER_LOADING, USER_LOADED, PROFILE_ERROR } from "./types";
// Get current users profile
export const getCurrentUser = () => async (dispatch, getState) => {
	//User loading
	dispatch({ type: USER_LOADING });
	const token = getState().auth.token;
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	if (token) {
		config.headers["x-auth-token"] = token;
	}

	try {
		axios.get("http://localhost:5000/api/auth/user", config).then((res) =>
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			})
		);
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};
