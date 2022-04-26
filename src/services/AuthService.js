import {API_BASE} from "../constants";
import {checkResponse} from "./checkResponse";

/**
 * Сервис для заказов
 */
export default class AuthService {

	static async login(credentials) {
		return await fetch(`${API_BASE}/api/auth/login`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(credentials)
		})
			.then(checkResponse);
	}

	static async create(credentials) {
		return await fetch(`${API_BASE}/api/auth/register`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(credentials)
		})
			.then(checkResponse);
	}
	
}