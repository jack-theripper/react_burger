export const INGREDIENT_DETAILS = 'ING_DETAILS';

export function ingredientDetailsSetAction(ingredient) {
	return {
		type: INGREDIENT_DETAILS,
		payload: ingredient
	}
}