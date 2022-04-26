import {API_BASE} from "../constants";
import {checkResponse} from "./checkResponse";

/**
 * Сервис для заказов
 */
export default class AuthService {
	
	/**
	 * @returns {Promise<any>} Создать заказ.
	 */
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