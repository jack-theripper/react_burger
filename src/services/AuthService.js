import {API_BASE} from "../constants";
import {checkResponse} from "./checkResponse";

/**
 * Сервис для заказов
 */
export default class AuthService {

	static async logout() {
		return await AuthService.fetch(`${API_BASE}/api/auth/logout`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({token: AuthService.getToken('refresh_token')})
		})
			.then(checkResponse);
	}

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

	static async refreshToken(refreshToken) {
		return await fetch(`${API_BASE}/api/auth/token`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({token: refreshToken})
		});
	}

	/**
	 * Возвращает сохранённый токен или `null`
	 *
	 * @param {("token"|"refresh_token")} whichToken
	 * @returns {string|null}
	 */
	static getToken(whichToken) {
		return localStorage.getItem(whichToken) || null;
	}

	static updateTokens(tokens) {
		localStorage.setItem('token', tokens.accessToken || null);
		localStorage.setItem('refresh_token', tokens.refreshToken || null);
	}

	static removeTokens() {
		localStorage.removeItem('token');
		localStorage.removeItem('refresh_token');
	}

	static async fetch(url, options = {}) {

		const request = () => fetch(url, {...options, headers: {...options.headers, Authorization: this.getToken('token')}});
		const throwException = (message) => {
			throw new Error(message)
		}

		try {
			const response = await request();

			if (response.status !== 401 || this.getToken('refresh_token') === null) {
				return response;
			}

			const responseRefresh = await this.refreshToken(this.getToken('refresh_token'));
			const responseTokens = await responseRefresh.json();

			if (!responseTokens.success) {
				throwException(responseTokens.message || 'Ошибка обновления токена');
			}

			this.updateTokens(responseTokens)

			return request();
		} catch (error) {
			this.removeTokens();

			return Promise.reject(error.toString())
		}
	}

}