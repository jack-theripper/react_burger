import IngredientsService from "../IngredientsService";
import {IngredientType} from "../../types/types";
import {AppDispatch, AppThunk} from "../store";

export const INGREDIENTS_SET = 'ING_SET';

export interface IngredientsSet {
    readonly type: typeof INGREDIENTS_SET;
    readonly payload: IngredientType[];
}

export type TIngredientsActions = IngredientsSet;

export function ingredientsSetAction(payload: IngredientType[]): IngredientsSet {
    return {
        type: INGREDIENTS_SET,
        payload
    }
}

export const fetchIngredientsAction: AppThunk = () => {
    return (dispatch: AppDispatch) => {
        IngredientsService.getAll()
            .then(response => dispatch(ingredientsSetAction(response)))
            .catch(error => alert(error));
    }
}