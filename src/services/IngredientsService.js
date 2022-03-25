import {API_BASE} from "../constants";

/**
 * Сервис для ингредиентов
 */
export default class IngredientsService {

	/**
	 * @returns {Promise<any>} Получить список всех ингредиентов.
	 */
	static async getAll() {
		let response = await fetch(`${API_BASE}/api/ingredients`);

		if (!response.ok) {
			throw new Error(`Произошла ошибка: ${response.status}`);
		}

		return await response.json().then(response => response.data); // response.status == true
	}

}