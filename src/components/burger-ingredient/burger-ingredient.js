import React from 'react';
import {useDrag} from "react-dnd";
import cl from "./burger-ingredient.module.css";
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/price";

const BurgerIngredient = ({ingredient}) => {
	const [, dragRef] = useDrag({
		type: "ingredient",
		item: ingredient
	});

	return (
		<div draggable ref={dragRef} className={cl.item + ' relative'}>
			<img src={ingredient.image} alt={ingredient.name} />
			<Counter count={1} size="default" />
			<Price value={ingredient.price} />
			<p className="m-1">{ingredient.name}</p>
		</div>
	)
};

export default BurgerIngredient;