import {INGREDIENTS_SET, TIngredientsActions} from "../actions/ingredientsActions";
import {IngredientType} from "../../types/types";

export const defaultState: IngredientType[] = [];

export default function ingredientsReducer(state: IngredientType[] = defaultState, action: TIngredientsActions) {
    switch (action.type) {

        case INGREDIENTS_SET:
            return action.payload;

        default:
            return state;
    }
}