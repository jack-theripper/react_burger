import UserService from "../UserService";

export const USER_PASSWORD_RESET_REQUEST = 'USER_PASSWORD_RESET_REQUEST';
export const USER_PASSWORD_RESET_CONFIRM_REQUEST = 'USER_PASSWORD_RESET_CONFIRM_REQUEST';
export const USER_SET_INFO = 'USER_SET_INFO';

export const USER_TRY_AUTH = 'USER_TRY_AUTH';

export const USER_SIGN_UP = 'USER_SIGN_UP';
export const USER_SIGN_UP_SUCCESS = 'USER_SIGN_UP_SUCCESS';
export const USER_SIGN_UP_FAILURE = 'USER_SIGN_UP_FAILURE';

export const USER_SIGN_IN = 'USER_SIGN_IN';
export const USER_SIGN_IN_SUCCESS = 'USER_SIGN_IN_SUCCESS';
export const USER_SIGN_IN_FAILURE = 'USER_SIGN_IN_FAILURE';

export function fetchUserActon() {
	return {
		type: USER_TRY_AUTH
	}
}

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



export function userSetInfo(payload) {
	return {
		type: USER_SET_INFO,
		payload
	}
}

export function userResetPasswordRequestAction(email) {
	return () => {
		UserService.resetPassword({email})
			.then(result => {
				alert(result.message);
			})
	}
}

export function userResetPasswordConfirmationAction(newPassword, confirmCode) {
	return () => {
		UserService.resetPasswordConfirm(newPassword, confirmCode)
			.then(result => {
				alert(result.message);
			})
			.catch(result => {
				alert(result.message)
			})
	}
}