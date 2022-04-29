import * as ActionTypes from '../actions/userActions';
import {USER_PROFILE_UPDATE_SUCCESS} from "../actions/userActions";

const defaultState = {
	user: {
		email: '',
		name: ''
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
		case ActionTypes.USER_PROFILE_UPDATE_SUCCESS:
			return {
				...defaultState, user: {...action.payload}
			};

		case ActionTypes.USER_SIGN_OUT_SUCCESS:
			return {
				...defaultState
			}

		case ActionTypes.USER_SIGN_OUT_FAILURE:
			return {
				...state, errorMessage: action.payload
			}

		default:
			return state;
	}
	
}