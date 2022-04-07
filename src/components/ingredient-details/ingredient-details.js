import React from 'react';
import {useSelector} from "react-redux";

/**
 * Модальное окно с описанием конкретного ингредиента.
 */
const IngredientDetails = () => {

	const ingredient = useSelector(state => state.ingredientDetails);

	return ingredient && (
		<div className="text-center mb-10">
			<img src={ingredient.image} alt=""/>
			<p className="text text_type_main-default">{ingredient.name}</p>
			<ul className="flex flex-gap flex-center mt-4">
				<li>
					<p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
					<p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
				</li>
				<li>
					<p className="text text_type_main-default text_color_inactive">Белки, г</p>
					<p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
				</li>
				<li>
					<p className="text text_type_main-default text_color_inactive">Жиры, г</p>
					<p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
				</li>
				<li>
					<p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
					<p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
				</li>
			</ul>
		</div>
	);
};

export default IngredientDetails;