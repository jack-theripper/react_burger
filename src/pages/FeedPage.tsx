import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../services/store";
import {socketCloseConnectionAction, socketOpenConnectionAction} from "../services/actions/socketActions";
import {WS_FEED_URL} from "../constants";
import {feedReceiveOrdersAction} from "../services/actions/feedActions";
import FeedOrder from "../components/feed-order/feed-order";
import cl from "./styles.module.css";
import FeedOrderSummary from "../components/feed-order/feed-order-summary";

const FeedPage: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const {orders, ...feed} = useSelector((state: RootState) => state.feed);

    useEffect(() => {
        dispatch(socketOpenConnectionAction(WS_FEED_URL, feedReceiveOrdersAction));

        return () => {
            dispatch(socketCloseConnectionAction());
        }
    }, []);

    return (<>
        <h1>Лента заказов</h1>
        <div className="grid">
            <div>
                <div className={`${cl.orders_container} custom-scroll`}>
                    <div className={cl.orders_cards_container}>
                        {orders.map(order => (
                            <FeedOrder order={order} key={order.number}/>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <FeedOrderSummary orders={orders}/>

                <p className={'text_type_main-medium'}>Выполнено за все время:</p>
                <div className={'text_type_digits-large'}>{feed.total.toLocaleString()}</div>

                <p className={'text_type_main-medium'}>Выполнено за сегодня:</p>
                <div className={'text_type_digits-large'}>{feed.totalToday.toLocaleString()}</div>
            </div>
        </div>
    </>);
};

export default FeedPage;