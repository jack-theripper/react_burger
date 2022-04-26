import UserService from "../UserService";

export const USER_PASSWORD_RESET_REQUEST = 'USER_PASSWORD_RESET_REQUEST';
export const USER_PASSWORD_RESET_CONFIRM_REQUEST = 'USER_PASSWORD_RESET_CONFIRM_REQUEST';
export const USER_SET_INFO = 'USER_SET_INFO';

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