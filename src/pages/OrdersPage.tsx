import React, {useEffect, useMemo} from 'react';
import {WS_ORDERS_URL} from "../constants";
import AuthService from "../services/AuthService";
import FeedOrder from "../components/feed-order/feed-order";
import {useHistory, useLocation, useRouteMatch} from "react-router-dom";
import {feedCloseConnectionAction, feedOpenConnectionAction} from "../services/slices/feedSlice";
import {useDispatch, useSelector} from "../services/store";
import cl from './styles.module.css';

const OrdersPage: React.FC = () => {

    const location = useLocation();
    const history = useHistory();

    const dispatch = useDispatch();
    const orders = useSelector(state => state.feed.orders);
    const sortedOrders = useMemo(() => [...orders].sort((a, b) => b.number - a.number), [orders]);

    useEffect(() => {
        dispatch(feedOpenConnectionAction(WS_ORDERS_URL + AuthService.getToken('token')));

        return () => {
            dispatch(feedCloseConnectionAction());
        }
    }, [dispatch]);

    const onClickHandler = (orderId: number) => () => history.push(`/profile/orders/${orderId}`, {feed: location})

    return (
        <div className={`${cl.orders_container} custom-scroll`}>
            <div className={cl.orders_cards_container}>
                {sortedOrders.map(order => (
                    <FeedOrder order={order} key={order._id} onClick={onClickHandler(order.number)}/>
                ))}
            </div>
        </div>
    )
};

export default OrdersPage;