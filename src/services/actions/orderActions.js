export const ORDER_ADD_INGREDIENT = 'ORD_ING_ADD';
export const ORDER_DETAILS_CHANGE = 'ORD_DET_CNG';

export function orderAddIngredientAction(ingredient) {
	return {
		type: ORDER_ADD_INGREDIENT,
		payload: {
			...ingredient,
			unique: Symbol('ingredient')
		}
	}
}

export function orderDetailsChangeAction(newDetails) {
	return {
		type: ORDER_DETAILS_CHANGE,
		payload: newDetails
	}
}
