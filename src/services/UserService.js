import {API_BASE} from "../constants";
import {checkResponse} from "./checkResponse";
import AuthService from "./AuthService";

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

	static async fetchUser() {
		return await AuthService.fetch(`${API_BASE}/api/auth/user`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
			.then(checkResponse);
	}

	static async update(data) {
		return await AuthService.fetch(`${API_BASE}/api/auth/user`, {
			method: 'PATCH',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(checkResponse);
	}

}