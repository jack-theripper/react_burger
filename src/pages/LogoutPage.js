import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {userSignOutAction} from "../services/actions/userActions";

const LogoutPage = () => {
	const dispatch = useDispatch();
	const errorMessage = useSelector(state => state.user.errorMessage);

	useEffect(() => {
		dispatch(userSignOutAction())
	}, []);

	return errorMessage && (<p>{errorMessage}</p>)
}

export default LogoutPage;