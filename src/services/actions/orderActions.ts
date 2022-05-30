import OrderService from "../OrderService";
import {IngredientType, OrderNewDetails} from "../../types/types";
import {AppDispatch, AppThunk, RootState} from "../store";

export const ORDER_DETAILS_CHANGE = 'ORD_DET_CNG';
export const ORDER_INGREDIENT_REMOVE = 'ORD_ING_DEL';
export const ORDER_INGREDIENTS_ADD = 'ORD_ING_ADD';
export const ORDER_INGREDIENTS_SWAP = 'ORD_ING_SWAP';
export const ORDER_INGREDIENTS_CLEAR = 'ORD_ING_EMPTY';
export const ORDER_CREATE_REQUEST = 'ORD_CRT_REQUEST';
export const ORDER_CREATE_FAILURE = 'ORD_CRT_FAIL';
export const ORDER_CREATE_SUCCESS = 'ORD_CRT_SUCCESS';



export interface OrderAddIngredient {
    readonly type: typeof ORDER_INGREDIENTS_ADD;
    readonly payload: IngredientType;
}

export interface OrderDetailsChange {
    readonly type: typeof ORDER_DETAILS_CHANGE;
    readonly payload: OrderNewDetails;
}

export interface OrderRemoveIngredient {
    readonly type: typeof ORDER_INGREDIENT_REMOVE;
    readonly payload: number;
}

export interface OrderIngredientSwap {
    readonly type: typeof ORDER_INGREDIENTS_SWAP;
    readonly from: IngredientType;
    readonly to: IngredientType;
}

export interface OrderRequest {
    readonly type: typeof ORDER_CREATE_REQUEST;
}

export interface OrderRequestFailed {
    readonly type: typeof ORDER_CREATE_FAILURE;
    readonly payload: string;
}

export interface OrderRequestSuccess {
    readonly type: typeof ORDER_CREATE_SUCCESS;
}

export interface OrderIngredientsRemoveAll {
    readonly type: typeof ORDER_INGREDIENTS_CLEAR;
}

export type TOrderActions = OrderAddIngredient | OrderDetailsChange | OrderRemoveIngredient
    | OrderIngredientSwap | OrderRequest | OrderRequestFailed | OrderRequestSuccess | OrderIngredientsRemoveAll;

export function orderAddIngredientAction(ingredient: IngredientType): OrderAddIngredient {
    return {
        type: ORDER_INGREDIENTS_ADD,
        payload: {
            ...ingredient,
            unique: Math.random() * 0x10000 // React!!! Symbol()
        }
    }
}

export function orderDetailsChangeAction(newDetails: OrderNewDetails): OrderDetailsChange {
    return {
        type: ORDER_DETAILS_CHANGE,
        payload: newDetails
    }
}

export const orderCreateAction: AppThunk = () => {
    return (dispatch: AppDispatch, getState: () => RootState) => {

        dispatch(orderRequestAction());
        dispatch(orderDetailsChangeAction({orderNumber: null}));

        OrderService.create(getState().order.ingredients.map((ingredient: any) => ingredient._id))
            .then(response => {
                dispatch(orderRequestSuccessAction());
                dispatch(orderDetailsChangeAction({orderNumber: response.order.number}));
            })
            .catch(e => {
                dispatch(orderRequestFailedAction(e.toString()))
            })
    }
}

export function orderRemoveIngredientAction(ingredient: IngredientType): OrderRemoveIngredient {
    return {
        type: ORDER_INGREDIENT_REMOVE,
        payload: ingredient.unique
    }
}

export function orderIngredientSwapAction(firstIngredient: IngredientType, secondIngredient: IngredientType): OrderIngredientSwap {
    return {
        type: ORDER_INGREDIENTS_SWAP,
        from: firstIngredient,
        to: secondIngredient
    }
}

export function orderRequestAction(): OrderRequest {
    return {
        type: ORDER_CREATE_REQUEST
    }
}

export function orderRequestFailedAction(errorMessage: string = ''): OrderRequestFailed {
    return {
        type: ORDER_CREATE_FAILURE,
        payload: errorMessage
    }
}

export function orderRequestSuccessAction(): OrderRequestSuccess {
    return {
        type: ORDER_CREATE_SUCCESS
    }
}

export function orderIngredientsRemoveAllAction(): OrderIngredientsRemoveAll {
    return {
        type: ORDER_INGREDIENTS_CLEAR
    }
}
