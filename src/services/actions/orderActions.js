import OrderService from "../OrderService";

export const ORDER_ADD_INGREDIENT = 'ORD_ING_ADD';
export const ORDER_REMOVE_INGREDIENT = 'ORD_ING_DEL';
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

export function orderCreateAction() {
	return (dispatch, getState) => {

		const {order} = getState();

		dispatch(orderDetailsChangeAction({orderNumber: null}));

		OrderService.create(order.ingredients.map(ingredient => ingredient._id))
			.then(response => {
				if (response.success) {
					dispatch(orderDetailsChangeAction({orderNumber: response.order.number}))
				}
			})

	}
}

export function orderRemoveIngredientAction(ingredient) {
	return {
		type: ORDER_REMOVE_INGREDIENT,
		payload: ingredient.unique
	}
}