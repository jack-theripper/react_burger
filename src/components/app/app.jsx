import React, {useEffect} from 'react';
import AppHeader from "../app-header/app-header";
import {useDispatch} from "react-redux";
import {fetchIngredientsAction} from "../../services/actions/ingredientsActions";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import IndexPage from "../../pages/IndexPage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage";

const App = () => {

	const dispatch = useDispatch();

	useEffect(() => dispatch(fetchIngredientsAction()), [dispatch]);

	return (
		<div className="App">
			<AppHeader/>
			<div className="container">
				<BrowserRouter>
					<Switch>
						<Route path="/" component={IndexPage} exact />
						<Route path="/login" component={LoginPage} />
						<Route path="/register" component={RegisterPage} />
						<Route path="/forgot-password" component={ForgotPasswordPage} />
						<Route path="/reset-password" component={ResetPasswordPage} />
					</Switch>
				</BrowserRouter>
			</div>
		</div>
	);
};

export default App;
