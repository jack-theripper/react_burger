import {API_BASE} from "../constants";
import {checkResponse} from "./checkResponse";

type FetchOptions = {
	[option: string]: any;
}

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

	static async login(credentials: any) {
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

	static async create(credentials: any) {
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

	static async refreshToken(refreshToken: string) {
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
	static getToken(whichToken: string): string {
		return localStorage.getItem(whichToken) || '';
	}

	static updateTokens(tokens: {accessToken?: string, refreshToken?: string}) {
		localStorage.setItem('token', tokens.accessToken || '');
		localStorage.setItem('refresh_token', tokens.refreshToken || '');
	}

	static removeTokens() {
		localStorage.removeItem('token');
		localStorage.removeItem('refresh_token');
	}

	static async fetch(url: string, options: FetchOptions = {}): Promise<any> {

		const request = () => fetch(url, {...options, headers: {...options.headers, Authorization: this.getToken('token')}});
		const throwException = (message: string) => {
			throw new Error(message)
		}

		try {
			const response = await request();

			if ((response.status !== 401 && response.status !== 403) || this.getToken('refresh_token') === null) {
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

			if (error instanceof Error) {
				return Promise.reject(error.toString())
			}
		}
	}

}