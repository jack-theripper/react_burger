import React from 'react';
import PropTypes from "prop-types";
import {IngredientPropType} from "../../propTypes";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import cl from './burger-ingredients-list.module.css';
import {TITLES} from "../../constants";

const BurgerIngredientsList = React.forwardRef(({type, list, onClick = () => null}, ref) => {
	return (
		<>
			<h2 className="margin" ref={ref}>{TITLES[type]}</h2>
			<ul className="grid p-5">
				{list.map(ingredient => (
					<li key={ingredient._id} className="flex flex-center" onClick={() => onClick(ingredient)}>
						<div className={cl.item + ' relative'}>
							<img src={ingredient.image} alt={ingredient.name} />
							<Counter count={1} size="default" />
							<p className={cl.price}>
								<span className="pr-1">{ingredient.price}</span>
								<CurrencyIcon type="primary"/>
							</p>
							<p className="m-1">{ingredient.name}</p>
						</div>
					</li>
				))}
			</ul>
		</>
	);
});

BurgerIngredientsList.propTypes = {
	type: PropTypes.string.isRequired,
	list: PropTypes.arrayOf(IngredientPropType.isRequired),
	onClick: PropTypes.func
}

BurgerIngredientsList.defaultProps = {
	list: []
}

export default BurgerIngredientsList;