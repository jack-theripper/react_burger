import reducer, {defaultState} from './orderReducer';
import {
    ORDER_CREATE_FAILURE,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_CHANGE,
    ORDER_INGREDIENTS_CLEAR,
    orderAddIngredientAction,
    orderIngredientSwapAction,
    orderRemoveIngredientAction
} from "../actions/orderActions";

describe('order reducer', () => {

    const ingredient = {
        _id: "60d3b41abdacab0026a733c6",
        name: "Краторная булка N-200i",
        type: "bun",
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    };

    it('initial state', () => {
        expect(reducer(undefined, {})).toEqual(defaultState);
    })

    it('add ingredient to order', () => {
        expect(reducer(defaultState, orderAddIngredientAction(ingredient)).ingredients)
            .toEqual([expect.objectContaining({unique: expect.any(Number)})])
    })

    it('details change', () => {
        const expectDetails = {orderNumber: 123};
        expect(reducer(defaultState, {
            type: ORDER_DETAILS_CHANGE,
            payload: expectDetails
        }).details).toEqual(expectDetails);
    })

    it('remove ingredient from list', () => {
        let state = defaultState;

        state = reducer(state, orderAddIngredientAction(ingredient))
        expect(state.ingredients).toHaveLength(1); // в списке 1 ингредиент

        state = reducer(state, orderAddIngredientAction(ingredient));
        expect(state.ingredients).toHaveLength(2); // в списке 2 ингредиента

        const shouldBeRemoved = state.ingredients[0];
        state = reducer(state, orderRemoveIngredientAction(shouldBeRemoved));
        expect(state.ingredients).toHaveLength(1); // в списке снова 1 ингредиент и
        expect(state.ingredients).not.toContainEqual(shouldBeRemoved); // ранее добавленного ингредиента не должно быть
    })

    it('ingredients sort', () => {
        let state = defaultState;

        state = reducer(state, orderAddIngredientAction(ingredient));
        state = reducer(state, orderAddIngredientAction(ingredient));
        expect(state.ingredients).toHaveLength(2);

        const expectOrder = [state.ingredients[1], state.ingredients[0]]; // запомнить порядок эелементов
        state = reducer(state, orderIngredientSwapAction(state.ingredients[0], state.ingredients[1]));
        expect(state.ingredients).toHaveLength(2);
        expect(state.ingredients).toEqual(expectOrder);
    });

    it('creation order request', () => {
        expect(reducer(defaultState, {type: ORDER_CREATE_REQUEST}).errorMessage).toBeNull()
    })

    it('creation order request completed successfully', () => {
        expect(reducer(defaultState, {type: ORDER_CREATE_SUCCESS}).errorMessage).toBeNull()
    })

    it('creation order request failed with an error', () => {
        const errorMessage = 'sample error';
        expect(reducer(defaultState, {
            type: ORDER_CREATE_FAILURE,
            payload: errorMessage
        }).errorMessage).toBe(errorMessage)
    })

    it('ingredients clear', () => {
        expect(reducer(defaultState, {type: ORDER_INGREDIENTS_CLEAR}).ingredients.length).toBe(0)
    })

})