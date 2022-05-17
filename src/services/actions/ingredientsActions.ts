import IngredientsService from "../IngredientsService";
import {IngredientType} from "../../types/types";

export const INGREDIENTS_SET = 'ING_SET';

export function ingredientsSetAction(payload: IngredientType[]) {
	return {
		type: INGREDIENTS_SET,
		payload
	}
}

export function fetchIngredientsAction() {
	return (dispatch: any) => {
		IngredientsService.getAll()
			.then(response => dispatch(ingredientsSetAction(response)))
			.catch(error => alert(error));
	}
}