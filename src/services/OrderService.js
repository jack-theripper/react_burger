import {API_BASE} from "../constants";
import {checkResponse} from "./checkResponse";
import AuthService from "./AuthService";

/**
 * Сервис для заказов
 */
export default class OrderService {

	/**
	 * @returns {Promise<any>} Создать заказ.
	 */
	static async create(ingredients) {
		return await AuthService.fetch(`${API_BASE}/api/orders`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ingredients})
		})
			.then(checkResponse);
	}

}