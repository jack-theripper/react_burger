import {Middleware, MiddlewareAPI} from "redux";
import {AppDispatch, RootState} from "./store";
import {SocketActions} from "../types/types";

export const socketMiddleware = (actions: SocketActions): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return (next) => (action) => {
            const {dispatch} = store;

            if (actions.socketOpenConnection.match(action)) {
                socket !== null && socket.close(1000);
                socket = new WebSocket(action.payload);

                socket.addEventListener('open', () => dispatch(actions.socketConnectionEstablished()));
                socket.addEventListener('close', (event: CloseEvent) => dispatch(actions.socketConnectionLost(event)));
                socket.addEventListener('error', (event: Event) => dispatch(actions.socketError(event)));

                socket.addEventListener('message', (event: MessageEvent) => {
                    dispatch(actions.socketReceiveMessage(event.data));
                });
            }

            if (socket && actions.socketCloseConnection.match(action)) {
                socket.close(1000);
            }

            return next(action);
        }
    }
}