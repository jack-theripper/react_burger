import React, {useEffect} from 'react';
import AppHeader from "../app-header/app-header";
import {useDispatch} from "react-redux";
import {fetchIngredientsAction} from "../../services/actions/ingredientsActions";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import IndexPage from "../../pages/IndexPage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";

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
						<Route path="/login" component={LoginPage}/>
						<Route path="/register" component={RegisterPage}/>
					</Switch>
				</BrowserRouter>
			</div>
		</div>
	);
};

export default App;
