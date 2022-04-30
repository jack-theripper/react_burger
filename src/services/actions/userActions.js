import UserService from "../UserService";

export const USER_PASSWORD_RESET_REQUEST = 'USER_PASSWORD_RESET_REQUEST';
export const USER_PASSWORD_RESET_CONFIRM_REQUEST = 'USER_PASSWORD_RESET_CONFIRM_REQUEST';

export const USER_SET_INFO = 'USER_SET_INFO';

export const USER_TRY_AUTH = 'USER_TRY_AUTH';
export const USER_TRY_AUTH_FAILURE = 'USER_TRY_AUTH_FAILURE';

export const USER_SIGN_UP = 'USER_SIGN_UP';
export const USER_SIGN_UP_SUCCESS = 'USER_SIGN_UP_SUCCESS';
export const USER_SIGN_UP_FAILURE = 'USER_SIGN_UP_FAILURE';

export const USER_SIGN_IN = 'USER_SIGN_IN';
export const USER_SIGN_IN_SUCCESS = 'USER_SIGN_IN_SUCCESS';
export const USER_SIGN_IN_FAILURE = 'USER_SIGN_IN_FAILURE';

export const USER_SIGN_OUT = 'USER_SIGN_OUT';
export const USER_SIGN_OUT_SUCCESS = 'USER_SIGN_OUT_SUCCESS';
export const USER_SIGN_OUT_FAILURE = 'USER_SIGN_OUT_FAILURE';

export const USER_PROFILE_UPDATE = 'USER_PROFILE_UPDATE';
export const USER_PROFILE_UPDATE_SUCCESS = 'USER_PROFILE_UPDATE_SUCCESS';
export const USER_PROFILE_UPDATE_FAILURE = 'USER_PROFILE_UPDATE_FAILURE';

export function userSignUpAction(email, password, name) {
	return {
		type: USER_SIGN_UP,
		payload: {
			email, password, name
		}
	}
}

export function userSignUpFailureAction(errorMessage = '') {
	return {
		type: USER_SIGN_UP_FAILURE,
		payload: errorMessage
	}
}

export function userSignInAction(email, password) {
	return {
		type: USER_SIGN_IN,
		payload: {
			email, password
		}
	}
}

export function userSignInFailureAction(errorMessage = '') {
	return {
		type: USER_SIGN_UP_FAILURE,
		payload: errorMessage
	}
}

export function userProfileUpdateAction(state) {
	return {
		type: USER_PROFILE_UPDATE,
		payload: state
	}
}

export function userSignOutAction() {
	return {
		type: USER_SIGN_OUT
	}
}

export function userSignOutSuccessAction() {
	return {
		type: USER_SIGN_OUT_SUCCESS
	}
}

export function userSignOutFailureAction(errorMessage = '') {
	return {
		type: USER_SIGN_OUT_FAILURE,
		payload: errorMessage
	}
}

export function userTryAuth() {
	return {
		type: USER_TRY_AUTH
	}
}

export function userTryAuthFailure(errorMessage = '') {
	return {
		type: USER_TRY_AUTH_FAILURE,
		payload: errorMessage
	}
}

export function userSetData(payload) {
	return {
		type: USER_SET_INFO,
		payload
	}
}

export function userResetPasswordRequestAction(email, history) {
	return {
		type: USER_PASSWORD_RESET_REQUEST,
		payload: email,
		history
	}
}

export function userResetPasswordConfirmationAction(newPassword, confirmCode, history) {
	return {
		type: USER_PASSWORD_RESET_CONFIRM_REQUEST,
		payload: {newPassword, confirmCode},
		history
	}
}
