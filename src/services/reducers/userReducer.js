import {USER_SET_INFO} from "../actions/userActions";

const defaultState = {}

export default function userReducer(state = defaultState, action) {
	
	switch (action.type) {
		
		case USER_SET_INFO:
			return action.payload;
		
		default:
			return state;
	}
	
}