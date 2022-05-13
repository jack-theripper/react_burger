import React from "react";
import {useSelector} from "react-redux";
import {Redirect, useLocation} from "react-router-dom";

interface LocationState {
	from?: string;
}

const withAuth = (Component: React.FC, shouldLoggedIn: boolean = true) => {
	return () => {
		const location = useLocation<LocationState>();
		const isLogged = useSelector<any, boolean>(state => state.user.isLogged);

		if (shouldLoggedIn) {
			return isLogged ? <Component/> : <Redirect to={{pathname: '/login', state: {from: location}}}/>;
		}

		return isLogged ? (<Redirect to={location.state?.from || '/'}/>) : <Component/>;
	}
};

export default withAuth;