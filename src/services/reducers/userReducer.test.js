import reducer, {defaultState} from './userReducer';
import {
    USER_PROFILE_UPDATE_SUCCESS,
    USER_SET_INFO,
    USER_SIGN_IN_FAILURE,
    USER_SIGN_IN_SUCCESS,
    USER_SIGN_OUT_FAILURE,
    USER_SIGN_OUT_SUCCESS,
    USER_SIGN_UP_FAILURE,
    USER_SIGN_UP_SUCCESS
} from "../actions/userActions";

describe('user reducer', () => {

    it('initial state', () => {
        expect(reducer(undefined, {})).toEqual(defaultState);
    });

    it('user signup success', () => {
        expect(reducer(defaultState, {type: USER_SIGN_UP_SUCCESS})).toMatchObject({isLogged: true, errorMessage: null})
    });

    it('user signup failure', () => {
        const errorMessage = 'sample error';
        expect(reducer(defaultState, {type: USER_SIGN_UP_FAILURE, payload: errorMessage}).errorMessage).toBe(errorMessage)
    });

    it('user signin success', () => {
        expect(reducer(defaultState, {type: USER_SIGN_IN_SUCCESS})).toMatchObject({isLogged: true, errorMessage: null})
    });

    it('user signin failure', () => {
        const errorMessage = 'sample error';
        expect(reducer(defaultState, {type: USER_SIGN_IN_FAILURE, payload: errorMessage}).errorMessage).toBe(errorMessage)
    });

    it('user set data', () => {
        const expectProfile = {email: 'example@example.com', name: 'Angelina Jolie'};
        const expectState = {...defaultState, user: expectProfile, isLogged: true};

        expect(reducer(defaultState, {type: USER_SET_INFO, payload: expectProfile})).toEqual(expectState);
    });

    it('user profile update success', () => {
        const expectProfile = {email: 'example@example.com', name: 'Angelina Jolie', password: 123321};
        const expectState = {...defaultState, user: expectProfile, isLogged: true};

        expect(reducer(defaultState, {type: USER_PROFILE_UPDATE_SUCCESS, payload: expectProfile})).toEqual(expectState);
    })

    it('user signout success', () => {
        expect(reducer(defaultState, {type: USER_SIGN_OUT_SUCCESS})).toEqual(defaultState)
    })

    it('user signout failure', () => {
        const errorMessage = 'sample error';
        expect(reducer(defaultState, {type: USER_SIGN_OUT_FAILURE, payload: errorMessage}).errorMessage).toBe(errorMessage)
    })

})