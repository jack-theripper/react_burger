import React, {useEffect, useState} from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {useDispatch, useSelector} from "react-redux";
import {fetchIngredientsAction} from "../../services/actions/ingredientsActions";
import {orderAddIngredientAction} from "../../services/actions/orderActions";
// import styles from './app.module.css'; // @todo

const App = () => {

	const dispatch = useDispatch();
	const data = useSelector(state => state.ingredients);

	useEffect(() => dispatch(fetchIngredientsAction()), []);

	const [orderState, setOrderState] = useState({
		orderNumber: 0,
		list: [],
	})

	useEffect(() => {
		if (data.length > 0) {

			dispatch(orderAddIngredientAction(data[0]))
			dispatch(orderAddIngredientAction(data[5]))
			dispatch(orderAddIngredientAction(data[4]))
			dispatch(orderAddIngredientAction(data[7]))
			dispatch(orderAddIngredientAction(data[8]))

			// setOrderState({
			// 	...orderState,
			// 	list: [data[0], data[5], data[4], data[7], data[8]]
			// });
		}
	}, [data]);

	return (
		<div className="App">
			<AppHeader/>
			<div className="container">
				<h1>Соберите бургер</h1>
				<div className="grid">
					<BurgerIngredients/>
					<BurgerConstructor/>
				</div>
			</div>
		</div>
	);
};

export default App;
