import React from 'react';
import {TITLES} from "../../constants";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import {IngredientType, IngredientTypes} from "../../types/types";

interface BurgerIngredientsListProps {
	type: IngredientTypes;
	list?: IngredientType[];
}

const BurgerIngredientsList = React.forwardRef<HTMLElement, BurgerIngredientsListProps>(({type, list = []}, ref) => {
	return (<section id={type} ref={ref}>
		<h2 className="margin">{TITLES[type]}</h2>
		<ul className="grid p-5">
			{list.map((ingredient: IngredientType) => (
				<li key={ingredient._id} className="flex flex-center">
					<BurgerIngredient ingredient={ingredient}/>
				</li>
			))}
		</ul>
	</section>)
});

export default BurgerIngredientsList;