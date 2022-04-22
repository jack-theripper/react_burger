import React, {useEffect} from 'react';
import AppHeader from "../app-header/app-header";
import {useDispatch} from "react-redux";
import {fetchIngredientsAction} from "../../services/actions/ingredientsActions";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import IndexPage from "../../pages/IndexPage";

const App = () => {

	const dispatch = useDispatch();

	useEffect(() => dispatch(fetchIngredientsAction()), [dispatch]);

	return (
		<div className="App">
			<AppHeader/>
			<div className="container">
				<BrowserRouter>
					<Switch>
						<Route path="/" exact>
							<IndexPage />
						</Route>
					</Switch>
				</BrowserRouter>
			</div>
		</div>
	);
};

export default App;
