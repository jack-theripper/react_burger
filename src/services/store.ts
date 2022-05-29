import {ActionCreator, applyMiddleware, compose, createStore, Dispatch} from "redux";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import createSagaMiddleware from 'redux-saga'
import reducer from './reducers';
import rootSaga from './sagas';
import {TIngredientsActions} from "./actions/ingredientsActions";
import {TOrderActions} from "./actions/orderActions";
import {TUserActions} from "./actions/userActions";
import {socketMiddleware} from "./socketMiddleware";
import {TSocketActions} from "./actions/socketActions";
import {TFeedActions} from "./actions/feedActions";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunkMiddleware, sagaMiddleware, socketMiddleware)));

sagaMiddleware.run(rootSaga);

export type TApplicationActions = TIngredientsActions | TOrderActions | TUserActions | TSocketActions | TFeedActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = Dispatch<TApplicationActions>;
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, RootState, any, TApplicationActions>>

export default store;