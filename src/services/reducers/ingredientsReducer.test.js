import reducer, {defaultState} from "./ingredientsReducer";
import {ingredientsSetAction} from "../actions/ingredientsActions";

describe('ingredients reducer', () => {

    const payload = {
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
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png"
    };

    it('initial state', () => {
        expect(reducer(undefined, {})).toEqual(defaultState);
    });

    it('replace state', () => {
        expect(reducer(defaultState, ingredientsSetAction([payload]))).toEqual([payload]);
    });

});