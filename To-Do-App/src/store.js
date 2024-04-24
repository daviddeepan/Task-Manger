import { combineReducers, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import {thunk} from 'redux-thunk'
import { authReducer } from "./reducers/authReducer";
import { profileReducer } from "./reducers/profileReducer";
import { composeWithDevTools } from "@redux-devtools/extension";

const reducers = combineReducers({
	auth: authReducer,
	profile: profileReducer,
});

const store = createStore(
	reducers,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
