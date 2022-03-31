import {API_BASE} from "../constants";

/**
 * Сервис для заказов
 */
export default class OrderService {

	/**
	 * @returns {Promise<any>} Создать заказ.
	 */
	static async create(ingredients) {
		let response = await fetch(`${API_BASE}/api/orders`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ingredients})
		});

		return await response.json().then(response => {
			if (!response.success) throw new Error(response.message)
			return response;
		});
	}

}