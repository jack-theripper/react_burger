import React, {useMemo} from 'react';
import {useDrag} from "react-dnd";
import cl from "./burger-ingredient.module.css";
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/price";
import {useSelector} from "react-redux";
import {IngredientPropType} from "../../propTypes";

const BurgerIngredient = ({ingredient}) => {

	const [, dragRef] = useDrag({
		type: "ingredient",
		item: ingredient
	});

	const orderIngredients = useSelector(state => state.order.ingredients);
	const count = useMemo(() =>
		orderIngredients.reduce((function (previousValue, currentValue) {
			return previousValue + (currentValue._id === ingredient._id ? (ingredient.type === 'bun' ? 2 : 1) : 0);
		}), 0), [orderIngredients]);

	return (
		<div draggable ref={dragRef} className={cl.item + ' relative'}>
			<img src={ingredient.image} alt={ingredient.name}/>
			{count > 0 && <Counter count={count} size="default"/>}
			<Price value={ingredient.price}/>
			<p className="m-1">{ingredient.name}</p>
		</div>
	)
};

BurgerIngredient.propTypes = {
	ingredient: IngredientPropType.isRequired
}

export default BurgerIngredient;