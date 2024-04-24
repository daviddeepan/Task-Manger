import {
	USER_LOADING,
	PROFILE_ERROR,
	USER_LOADED,
	CLEAR_PROFILE,
} from "../actions/types";

const initialState = {
	profile: null,
	loading: true,
	error: {},
};

export const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_LOADING:
			return {
				...state,
				loading: true,
			};
		case USER_LOADED:
			return {
				...state,
				loading: false,
				profile: action.payload,
			};
		case PROFILE_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
				profile: null,
			};
		case CLEAR_PROFILE:
			return {
				...state,
				profile: null,
				loading: false,
				
			};
		default:
			return state;
	}
};