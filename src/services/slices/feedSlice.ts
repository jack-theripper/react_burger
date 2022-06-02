import {FeedOrderType} from "../../types/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface FeedReceiveOrdersPayload {
    success: boolean;
    orders: FeedOrderType[];
    total: number;
    totalToday: number;
}

interface FeedState {
    orders: FeedOrderType[];
    total: number;
    totalToday: number;
    isConnected: boolean;
    isError: boolean;
}

const initialState: FeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isConnected: false,
    isError: false,
};

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        feedOpenConnectionAction(state, action: PayloadAction<string>) {
            // ...
        },
        feedCloseConnectionAction() {
            return initialState;
        },
        feedConnectionEstablishedAction(state) {
            state.isConnected = true;
            state.isError = false;
        },
        feedConnectionLostAction(state, action: PayloadAction<CloseEvent>) {
            return initialState;
        },
        feedReceiveMessageAction(state, action: PayloadAction<string>) {
            const data = JSON.parse(action.payload) as FeedReceiveOrdersPayload;

            if (data.success) {
                state.orders = data.orders;
                state.total = data.total;
                state.totalToday = data.totalToday;
            }
        },
        feedErrorAction(state, action: PayloadAction<Event>) {
            state = initialState;
            state.isError = true;
        }
    }
});

export const {
    feedOpenConnectionAction,
    feedCloseConnectionAction,
    feedConnectionEstablishedAction,
    feedConnectionLostAction,
    feedReceiveMessageAction,
    feedErrorAction
} = feedSlice.actions;

type SliceActions<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => infer A ? A : never;
}[keyof T];

export type TFeedActions = SliceActions<typeof feedSlice.actions>;

export default feedSlice.reducer;