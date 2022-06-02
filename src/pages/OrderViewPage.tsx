import React, {useEffect} from 'react';
import FeedOrderDetails from "../components/feed-order/feed-order-details";
import {feedCloseConnectionAction, feedOpenConnectionAction} from "../services/slices/feedSlice";
import {WS_ORDERS_URL} from "../constants";
import AuthService from "../services/AuthService";
import {useDispatch} from "../services/store";
import withAuth from "../services/withAuth";

const OrderViewPage: React.FC = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(feedOpenConnectionAction(WS_ORDERS_URL + AuthService.getToken('token')));

        return () => {
            dispatch(feedCloseConnectionAction());
        }
    }, [dispatch]);

    return (
        <FeedOrderDetails/>
    );
};

export default withAuth(OrderViewPage);