import React, {useEffect, useState} from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {useDispatch, useSelector} from "react-redux";
import {fetchIngredientsAction} from "../../services/actions/ingredientsActions";
import {orderAddIngredientAction} from "../../services/actions/orderActions";
// import styles from './app.module.css'; // @todo
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

const App = () => {

	const dispatch = useDispatch();

	useEffect(() => dispatch(fetchIngredientsAction()), []);

	const [orderState, setOrderState] = useState({
		orderNumber: 0,
		list: [],
	})

	return (
		<div className="App">
			<AppHeader/>
			<div className="container">
				<h1>Соберите бургер</h1>
				<div className="grid">
					<DndProvider backend={HTML5Backend}>
						<BurgerIngredients/>
						<BurgerConstructor/>
					</DndProvider>
				</div>
			</div>
		</div>
	);
};

export default App;
