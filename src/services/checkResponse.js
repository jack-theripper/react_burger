export const checkResponse = (response) => {
	if (response.ok) {
		return response.json();
	}

	return response.json()
		.then(response => Promise.reject(new Error(response.message)))
}