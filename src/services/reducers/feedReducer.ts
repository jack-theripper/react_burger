import {FEED_RECEIVE_ORDERS, TFeedActions} from "../actions/feedActions";
import {FeedOrderType} from "../../types/types";

interface FeedState {
    orders: FeedOrderType[];
    total: number;
    totalToday: number;
}

const defaultState: FeedState = {
    orders: [],
    total: 0,
    totalToday: 0
};

export default function (state: FeedState = defaultState, action: TFeedActions) {
    switch (action.type) {

        case FEED_RECEIVE_ORDERS:
            return {
                orders: [...action.payload.orders], total: action.payload.total, totalToday: action.payload.totalToday
            }

        default:
            return state;
    }
}