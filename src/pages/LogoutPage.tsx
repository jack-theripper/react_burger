import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {userSignOutAction} from "../services/actions/userActions";
import withAuth from "../services/withAuth";
import {AppDispatch, RootState} from "../services/store";

const LogoutPage: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const errorMessage = useSelector<RootState, string | null>(state => state.user.errorMessage);

	useEffect(() => {
		dispatch(userSignOutAction())
	}, [dispatch]);

	return errorMessage ? <p>{errorMessage}</p> : null;
}

export default withAuth(LogoutPage);