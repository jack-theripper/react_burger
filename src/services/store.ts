import {ActionCreator, applyMiddleware, compose, createStore} from "redux";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import createSagaMiddleware from 'redux-saga'
import reducer from './reducers';
import rootSaga from './sagas';
import {TIngredientsActions} from "./actions/ingredientsActions";
import {TOrderActions} from "./actions/orderActions";
import {TUserActions} from "./actions/userActions";
import {socketMiddleware} from "./socketMiddleware";
import {
    feedCloseConnectionAction,
    feedConnectionEstablishedAction,
    feedConnectionLostAction,
    feedErrorAction,
    feedOpenConnectionAction,
    feedReceiveMessageAction,
    TFeedActions
} from "./slices/feedSlice";
import {SocketActions} from "../types/types";

const wsActions: SocketActions = {
    socketOpenConnection: feedOpenConnectionAction,
    socketCloseConnection: feedCloseConnectionAction,
    socketConnectionEstablished: feedConnectionEstablishedAction,
    socketConnectionLost: feedConnectionLostAction,
    socketReceiveMessage: feedReceiveMessageAction,
    socketError: feedErrorAction
}

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunkMiddleware, sagaMiddleware, socketMiddleware(wsActions))));

sagaMiddleware.run(rootSaga);

export type TApplicationActions = TIngredientsActions | TOrderActions | TUserActions | TFeedActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, RootState, any, TApplicationActions>>

export default store;