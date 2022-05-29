import {INGREDIENTS_SET, TIngredientsActions} from "../actions/ingredientsActions";
import {IngredientType} from "../../types/types";

type IngredientsState = IngredientType[];

const defaultState: IngredientsState = [];

export default function ingredientsReducer(state: IngredientsState = defaultState, action: TIngredientsActions) {
	switch (action.type) {

		case INGREDIENTS_SET:
			return action.payload;

		default:
			return state;
	}
}