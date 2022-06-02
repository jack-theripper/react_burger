import {
	ORDER_CREATE_FAILURE,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DETAILS_CHANGE,
	ORDER_INGREDIENT_REMOVE,
	ORDER_INGREDIENTS_ADD,
	ORDER_INGREDIENTS_CLEAR,
	ORDER_INGREDIENTS_SWAP,
	TOrderActions
} from "../actions/orderActions";
import {FeedOrderType, IngredientType, OrderDetailsType} from "../../types/types";

interface OrderState {
	ingredients: IngredientType[];
	details: OrderDetailsType;
	errorMessage: string | null;
}

const defaultState: OrderState = {
	ingredients: [],
	details: {
		orderNumber: null
	},
	errorMessage: ''
}

export default function orderReducer(state: OrderState = defaultState, action: TOrderActions) {
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

		case ORDER_INGREDIENTS_CLEAR:
			return {
				...state,
				ingredients: []
			}

		default:
			return state;
	}
}