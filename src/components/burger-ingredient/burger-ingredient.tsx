import React, {useMemo} from 'react';
import {useDrag} from "react-dnd";
import cl from "./burger-ingredient.module.css";
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/price";
import {useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";
import {IngredientType} from "../../types/types";
import {RootState} from "../../services/store";

interface BurgerIngredient {
	ingredient: IngredientType;
}

const BurgerIngredient: React.FC<BurgerIngredient> = ({ingredient}) => {

	const [, dragRef] = useDrag<IngredientType>({
		type: "ingredient",
		item: ingredient
	});

	const orderIngredients = useSelector<RootState, IngredientType[]>(state => state.order.ingredients);
	const count = useMemo(() =>
		orderIngredients.reduce((function (previousValue, currentValue) {
			return previousValue + (currentValue._id === ingredient._id ? (ingredient.type === 'bun' ? 2 : 1) : 0);
		}), 0), [orderIngredients]);

	const location = useLocation();

	return (<Link className={cl.item} ref={dragRef}
	              to={{pathname: `/ingredients/${ingredient._id}`, state: {background: location}}}
	>
		<div className={'relative'}>
			<img src={ingredient.image} alt={ingredient.name}/>
			{count > 0 && <Counter count={count} size="default"/>}
			<Price value={ingredient.price}/>
			<p className="m-1">{ingredient.name}</p>
		</div>
	</Link>)
};

export default BurgerIngredient;