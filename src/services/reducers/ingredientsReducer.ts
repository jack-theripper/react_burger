import {INGREDIENTS_SET, TIngredientsActions} from "../actions/ingredientsActions";
import {IngredientType} from "../../types/types";

type IngredientsState = Array<IngredientType>;

export default function ingredientsReducer(state: IngredientsState = [], action: TIngredientsActions) {
	switch (action.type) {

		case INGREDIENTS_SET:
			return action.payload;

		default:
			return state;
	}
}