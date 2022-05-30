import {Middleware, MiddlewareAPI} from "redux";
import {AppDispatch, RootState, TApplicationActions} from "./store";
import {
    SOCKET_CLOSE_CONNECTION,
    SOCKET_OPEN_CONNECTION,
    socketConnectionEstablishedAction,
    socketConnectionLostAction,
    socketErrorAction,
    socketReceiveMessageAction,
    SocketReceiveMessageHandler
} from "./actions/socketActions";

export const socketMiddleware: Middleware = (store: MiddlewareAPI<AppDispatch, RootState>) => {

    let socket: WebSocket | null = null;
    let handler: SocketReceiveMessageHandler;

    return (next) => (action: TApplicationActions) => {

        const {dispatch} = store;

        if (action.type === SOCKET_OPEN_CONNECTION) {

            socket !== null && socket.close(1000);
            socket = new WebSocket(action.url);

            socket.addEventListener('open', () => dispatch(socketConnectionEstablishedAction()));
            socket.addEventListener('close', (event: CloseEvent) => dispatch(socketConnectionLostAction(event)));
            socket.addEventListener('error', (event: Event) => dispatch(socketErrorAction(event)));

            socket.addEventListener('message', (event: MessageEvent) => {
                dispatch(socketReceiveMessageAction(event.data));
                handler && dispatch(handler(JSON.parse(event.data)));
            });

            handler = action.handler;
        }

        if (socket && action.type === SOCKET_CLOSE_CONNECTION) {
            socket.close(1000);
        }

        return next(action);
    }

}