import AuthService from "../services/AuthService";
import {useToken} from "./useToken";
import {useDispatch} from "react-redux";
import {userSetInfo} from "../services/actions/userActions";

export function useAuth() {
	
	const {setToken, setRefreshToken} = useToken();
	
	const dispatch = useDispatch();
	
	const setUser = (payload) => {
		dispatch(userSetInfo(payload));
	}
	
	const signUp = async (email, password, name) => {
		
		const result = await AuthService.create({email, password, name});
		
		if (result.success) {
			setUser(result.user);
			setToken(result.accessToken || '');
			setRefreshToken(result.refreshToken || '');
		}
		
		return result;
	}
	
	return {
		signUp, setUser
	}
	
}