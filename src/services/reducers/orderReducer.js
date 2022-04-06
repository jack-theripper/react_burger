import {ORDER_ADD_INGREDIENT, ORDER_DETAILS_CHANGE} from "../actions/orderActions";

const defaultState = {
	ingredients: [],
	details: {}
}

export default function orderReducer(state = defaultState, action) {
	switch (action.type) {

		case ORDER_ADD_INGREDIENT:
			return {
				...state,
				ingredients: [
					...state.ingredients,
					action.payload
				]
			}

		case ORDER_DETAILS_CHANGE:
			return {
				...state,
				details: {
					...state.details,
					...action.payload
				}
			}

		default:
			return state;
	}
}