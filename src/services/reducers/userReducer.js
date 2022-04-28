import * as ActionTypes from '../actions/userActions';

const defaultState = {
	user: {
		email: null,
		name: null
	},
	isLogged: false,
	errorMessage: null
}

export default function userReducer(state = defaultState, action) {
	
	switch (action.type) {

		case ActionTypes.USER_SIGN_UP_SUCCESS:
			return {
				...state, user: {...state.user, ...action.payload}, errorMessage: null
			}

		case ActionTypes.USER_SIGN_UP_FAILURE:
			return {
				...defaultState, errorMessage: action.payload
			}

		case ActionTypes.USER_SIGN_IN_SUCCESS:
			return {
				...state, user: {...state.user, ...action.payload}, errorMessage: null, isLogged: true
			}

		case ActionTypes.USER_SIGN_IN_FAILURE:
			return {
				...defaultState, errorMessage: action.payload, isLogged: false
			}

		case ActionTypes.USER_SET_INFO:
			return {
				...defaultState, user: {...action.payload}
			};
		
		default:
			return state;
	}
	
}