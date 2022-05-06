import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {userSignOutAction} from "../services/actions/userActions";
import withAuth from "../services/withAuth";

const LogoutPage = () => {
	const dispatch = useDispatch();
	const errorMessage = useSelector(state => state.user.errorMessage);

	useEffect(() => {
		dispatch(userSignOutAction())
	}, [dispatch]);

	return errorMessage && (<p>{errorMessage}</p>)
}

export default withAuth(LogoutPage);