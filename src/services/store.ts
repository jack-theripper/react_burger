import {applyMiddleware, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import createSagaMiddleware from 'redux-saga'
import reducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunkMiddleware, sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export default store;