export const checkResponse = <T extends Response>(response: T): any => {
	if (response.ok) {
		return response.json();
	}

	return response.json()
		.then(response => Promise.reject(new Error(response.message)))
}