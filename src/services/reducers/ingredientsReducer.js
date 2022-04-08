import {INGREDIENTS_SET} from "../actions/ingredientsActions";

export default function ingredientsReducer(state = [], action) {
	switch (action.type) {

		case INGREDIENTS_SET:
			return action.payload;

		default:
			return state;
	}
}