import {TApplicationActions} from "../store";

export const SOCKET_OPEN_CONNECTION = 'SOCKET_OPEN_CONNECTION';
export const SOCKET_CLOSE_CONNECTION = 'SOCKET_CLOSE_CONNECTION';

export const SOCKET_CONNECTION_ESTABLISHED = 'SOCKET_CONNECTION_ESTABLISHED';
export const SOCKET_CONNECTION_LOST = 'SOCKET_CONNECTION_LOST';

export const SOCKET_RECEIVE_MESSAGE = 'SOCKET_RECEIVE_MESSAGE';
export const SOCKET_ERROR = 'SOCKET_ERROR';

export interface SocketOpenConnection {
    readonly type: typeof SOCKET_OPEN_CONNECTION;
    readonly url: string;
    readonly handler: SocketReceiveMessageHandler;
}

export interface SocketCloseConnection {
    readonly type: typeof SOCKET_CLOSE_CONNECTION;
}

export interface SocketConnectionEstablished {
    readonly type: typeof SOCKET_CONNECTION_ESTABLISHED;
}

export interface SocketConnectionLost {
    readonly type: typeof SOCKET_CONNECTION_LOST;
}

export interface SocketReceiveMessage {
    readonly type: typeof SOCKET_RECEIVE_MESSAGE;
    readonly payload: any;
}

export interface SocketError {
    readonly type: typeof SOCKET_ERROR;
    event: Event;
}

export type SocketReceiveMessageHandler = ((payload: any) => TApplicationActions) | null;

export type TSocketActions = SocketOpenConnection | SocketCloseConnection | SocketConnectionEstablished
    | SocketConnectionLost | SocketReceiveMessage | SocketError;

export function socketOpenConnectionAction(url: string, handler: SocketReceiveMessageHandler = null): SocketOpenConnection {
    return {
        type: SOCKET_OPEN_CONNECTION,
        url, handler
    }
}

export function socketCloseConnectionAction(): SocketCloseConnection {
    return {
        type: SOCKET_CLOSE_CONNECTION
    }
}

export function socketConnectionEstablishedAction(): SocketConnectionEstablished {
    return {
        type: SOCKET_CONNECTION_ESTABLISHED
    }
}

export function socketConnectionLostAction(): SocketConnectionLost {
    return {
        type: SOCKET_CONNECTION_LOST
    }
}

export function socketReceiveMessageAction(payload: any): SocketReceiveMessage {
    return {
        type: SOCKET_RECEIVE_MESSAGE,
        payload
    }
}

export function socketErrorAction(event: Event): SocketError {
    return {
        type: SOCKET_ERROR,
        event
    }
}
