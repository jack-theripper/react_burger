import React from 'react';
import PropTypes from "prop-types";
import {IngredientPropType} from "../../propTypes";
import {TITLES} from "../../constants";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";

const BurgerIngredientsList = React.forwardRef(({type, list}, ref) => {
	return (<section id={type} ref={ref}>
		<h2 className="margin">{TITLES[type]}</h2>
		<ul className="grid p-5">
			{list.map(ingredient => (
				<li key={ingredient._id} className="flex flex-center">
					<BurgerIngredient ingredient={ingredient}/>
				</li>
			))}
		</ul>
	</section>)
});

BurgerIngredientsList.propTypes = {
	type: PropTypes.string.isRequired,
	list: PropTypes.arrayOf(IngredientPropType.isRequired),
}

BurgerIngredientsList.defaultProps = {
	list: []
}

export default BurgerIngredientsList;