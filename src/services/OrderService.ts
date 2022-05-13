import {API_BASE} from "../constants";
import {checkResponse} from "./checkResponse";
import AuthService from "./AuthService";

export default class OrderService {

	static async create(ingredients: string[]) {
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