import {API_BASE} from "../constants";
import {checkResponse} from "./checkResponse";
import {IngredientType} from "../types/types";

/**
 * Сервис для ингредиентов
 */
export default class IngredientsService {

	static async getAll(): Promise<IngredientType[]> {
		return await fetch(`${API_BASE}/api/ingredients`)
			.then(checkResponse)
			.then(response => response.data);
	}

}