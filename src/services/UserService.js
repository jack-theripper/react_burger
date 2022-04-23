import {API_BASE} from "../constants";
import {checkResponse} from "./checkResponse";

export default class UserService {

	static async resetPassword(credentials) {
		return await fetch(`${API_BASE}/api/password-reset`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(credentials)
		})
			.then(checkResponse);
	}

	static async resetPasswordConfirm(newPassword, confirmCode) {
		return await fetch(`${API_BASE}/api/password-reset/reset`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				password: newPassword,
				token: confirmCode
			})
		})
			.then(checkResponse);
	}

}