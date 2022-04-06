import OrderService from "../OrderService";

export const ORDER_ADD_INGREDIENT = 'ORD_ING_ADD';
export const ORDER_REMOVE_INGREDIENT = 'ORD_ING_DEL';
export const ORDER_DETAILS_CHANGE = 'ORD_DET_CNG';
export const ORDER_INGREDIENTS_SWAP = 'ORD_ING_SWAP';

export function orderAddIngredientAction(ingredient) {
	return {
		type: ORDER_ADD_INGREDIENT,
		payload: {
			...ingredient,
			unique: Math.random() * 0x10000 // React!!! Symbol()
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

export function orderIngredientSwapAction(firstIngredient, secondIngredient) {
	return {
		type: ORDER_INGREDIENTS_SWAP,
		from: firstIngredient,
		to: secondIngredient
	}
}
