import {useEffect, useState} from "react";

export function useToken() {
	const [token, setToken] = useState(localStorage.getItem('token') || '');
	const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh_token') || '');
	
	useEffect(() => localStorage.setItem('token', token), [token]);
	useEffect(() => localStorage.setItem('refresh_token', refreshToken), [refreshToken])
	
	return {
		token, setToken, refreshToken, setRefreshToken
	}
}