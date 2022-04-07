import {
	ORDER_CREATE_FAILURE,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DETAILS_CHANGE,
	ORDER_INGREDIENT_REMOVE,
	ORDER_INGREDIENTS_ADD,
	ORDER_INGREDIENTS_SWAP
} from "../actions/orderActions";

const defaultState = {
	ingredients: [],
	details: {
		orderNumber: null
	},
	errorMessage: null
}

export default function orderReducer(state = defaultState, action) {
	switch (action.type) {

		case ORDER_INGREDIENTS_ADD:
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

		case ORDER_INGREDIENT_REMOVE:
			return {
				...state,
				ingredients: [
					...state.ingredients.filter(value => value.unique !== action.payload)
				]
			}

		case ORDER_INGREDIENTS_SWAP:

			const ingredients = [...state.ingredients];
			const currIndex = ingredients.indexOf(action.from);
			const toIndex = ingredients.indexOf(action.to);

			ingredients.splice(currIndex, 1);
			ingredients.splice(toIndex, 0, action.from);

			return {...state, ingredients}

		case ORDER_CREATE_FAILURE:
			return {
				...state,
				errorMessage: action.payload
			}
			
		case ORDER_CREATE_REQUEST:
		case ORDER_CREATE_SUCCESS:
			return {
				...state,
				errorMessage: null
			}
			
		default:
			return state;
	}
}