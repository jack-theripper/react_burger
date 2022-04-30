export const INGREDIENT_DETAILS = 'INGREDIENT_DETAILS';

export function ingredientShowDetailsAction(ingredient) {
	return {
		type: INGREDIENT_DETAILS,
		payload: ingredient
	}
}