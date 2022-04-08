import {INGREDIENT_DETAILS} from "../actions/ingredientDetailsActions";

export default function ingredientDetailsReducer(state = null, action) {
	switch (action.type) {

		case INGREDIENT_DETAILS:
			return action.payload

		default:
			return state;
	}
}