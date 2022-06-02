import React, {useEffect} from 'react';
import {userSignOutAction} from "../services/actions/userActions";
import withAuth from "../services/withAuth";
import {useDispatch, useSelector} from "../services/store";

const LogoutPage: React.FC = () => {
	const dispatch = useDispatch();
	const errorMessage = useSelector(state => state.user.errorMessage);

	useEffect(() => {
		dispatch(userSignOutAction())
	}, [dispatch]);

	return errorMessage ? <p>{errorMessage}</p> : null;
}

export default withAuth(LogoutPage);