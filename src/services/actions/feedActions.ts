import {FeedOrderType} from "../../types/types";

export const FEED_RECEIVE_ORDERS = 'FEED_RECEIVE_ORDERS';

export interface FeedReceiveOrdersPayload {
    orders: FeedOrderType[];
    total: number;
    totalToday: number;
}

export interface FeedReceiveOrders {
    readonly type: typeof FEED_RECEIVE_ORDERS;
    readonly payload: FeedReceiveOrdersPayload
}

export type TFeedActions = FeedReceiveOrders;

export function feedReceiveOrdersAction(payload: any): FeedReceiveOrders {
    return {
        type: FEED_RECEIVE_ORDERS,
        payload
    }
}