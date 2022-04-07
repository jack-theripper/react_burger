import {API_BASE} from "../constants";
import {checkResponse} from "./checkResponse";

/**
 * Сервис для ингредиентов
 */
export default class IngredientsService {

	/**
	 * @returns {Promise<any>} Получить список всех ингредиентов.
	 */
	static async getAll() {
		return await fetch(`${API_BASE}/api/ingredients`)
			.then(checkResponse)
			.then(response => response.data);
	}

}