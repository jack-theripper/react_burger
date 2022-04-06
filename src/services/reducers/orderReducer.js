import {
	ORDER_ADD_INGREDIENT,
	ORDER_DETAILS_CHANGE,
	ORDER_INGREDIENTS_SWAP,
	ORDER_REMOVE_INGREDIENT
} from "../actions/orderActions";

const defaultState = {
	ingredients: [],
	details: {
		orderNumber: null
	}
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

		case ORDER_REMOVE_INGREDIENT:
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

		default:
			return state;
	}
}