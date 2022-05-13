import OrderService from "../OrderService";
import {IngredientType} from "../../types/types";

export const ORDER_DETAILS_CHANGE = 'ORD_DET_CNG';
export const ORDER_INGREDIENT_REMOVE = 'ORD_ING_DEL';
export const ORDER_INGREDIENTS_ADD = 'ORD_ING_ADD';
export const ORDER_INGREDIENTS_SWAP = 'ORD_ING_SWAP';
export const ORDER_INGREDIENTS_CLEAR = 'ORD_ING_EMPTY';
export const ORDER_CREATE_REQUEST = 'ORD_CRT_REQUEST';
export const ORDER_CREATE_FAILURE = 'ORD_CRT_FAIL';
export const ORDER_CREATE_SUCCESS = 'ORD_CRT_SUCCESS';

interface OrderDetailsChange {
	orderNumber: number | null;
}

export function orderAddIngredientAction(ingredient: IngredientType) {
	return {
		type: ORDER_INGREDIENTS_ADD,
		payload: {
			...ingredient,
			unique: Math.random() * 0x10000 // React!!! Symbol()
		}
	}
}

export function orderDetailsChangeAction(newDetails: OrderDetailsChange) {
	return {
		type: ORDER_DETAILS_CHANGE,
		payload: newDetails
	}
}

export function orderCreateAction() {
	return (dispatch: any, getState: any) => {
		
		dispatch(orderRequestAction());
		dispatch(orderDetailsChangeAction({orderNumber: null}));

		OrderService.create(getState().order.ingredients.map((ingredient: any) => ingredient._id))
			.then(response => {
				dispatch(orderRequestSuccessAction());
				dispatch(orderDetailsChangeAction({orderNumber: response.order.number}));
			})
			.catch(e => {
				dispatch(orderRequestFailedAction(e.toString()))
			})
	}
}

export function orderRemoveIngredientAction(ingredient: IngredientType) {
	return {
		type: ORDER_INGREDIENT_REMOVE,
		payload: ingredient.unique
	}
}

export function orderIngredientSwapAction(firstIngredient: IngredientType, secondIngredient: IngredientType) {
	return {
		type: ORDER_INGREDIENTS_SWAP,
		from: firstIngredient,
		to: secondIngredient
	}
}

export function orderRequestAction() {
	return {
		type: ORDER_CREATE_REQUEST
	}
}

export function orderRequestFailedAction(errorMessage: string = '') {
	return {
		type: ORDER_CREATE_FAILURE,
		payload: errorMessage
	}
}

export function orderRequestSuccessAction() {
	return {
		type: ORDER_CREATE_SUCCESS
	}
}

export function orderIngredientsRemoveAllAction() {
	return {
		type: ORDER_INGREDIENTS_CLEAR
	}
}
