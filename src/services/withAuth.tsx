import React from "react";
import {Redirect, useLocation} from "react-router-dom";
import {useSelector} from "./store";

interface LocationState {
	from?: {
		pathname: string;
	};
}

const withAuth = (Component: React.FC, shouldLoggedIn: boolean = true) => {
	return () => {
		const location = useLocation<LocationState>();
		const isLogged = useSelector(state => state.user.isLogged);

		if (shouldLoggedIn) {
			return isLogged ? <Component/> : <Redirect to={{pathname: '/login', state: {from: location.state?.from || location}}}/>;
		}

		const from = (location.state?.from && location.state.from?.pathname != '/logout') ? location.state?.from : '/';

		return isLogged ? (<Redirect to={from}/>) : <Component/>;
	}
};

export default withAuth;