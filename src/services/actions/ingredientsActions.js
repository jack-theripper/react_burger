import IngredientsService from "../IngredientsService";

export const INGREDIENTS_SET = 'ING_SET';

export function ingredientsSetAction(payload) {
	return {
		type: INGREDIENTS_SET,
		payload
	}
}

export function fetchIngredientsAction() {
	return (dispatch) => {
		IngredientsService.getAll()
			.then(response => dispatch(ingredientsSetAction(response)))
			.catch(error => alert(error));
	}
}