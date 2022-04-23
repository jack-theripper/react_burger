import UserService from "../UserService";

export const USER_PASSWORD_RESET_REQUEST = 'USER_PASSWORD_RESET_REQUEST';
export const USER_PASSWORD_RESET_CONFIRM_REQUEST = 'USER_PASSWORD_RESET_CONFIRM_REQUEST';

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