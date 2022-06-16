import reducer, {defaultState} from './userReducer';

describe('user reducer', () => {

    it('initial state', () => {
        expect(reducer(undefined, {})).toEqual(defaultState);
    });


})