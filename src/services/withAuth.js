import React from "react";
import {useSelector} from "react-redux";
import {Redirect, useLocation} from "react-router-dom";

const withAuth = (Component, shouldLoggedIn = true) => {
	return () => {
		const location = useLocation();
		const isLogged = useSelector(state => state.user.isLogged);

		if (shouldLoggedIn) {
			return isLogged ? <Component/> : <Redirect to={{pathname: '/login', state: {from: location}}}/>;
		}

		return isLogged ? (<Redirect to={location.state?.from || '/'}/>) : <Component/>;
	}
};

export default withAuth;