import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../services/store";
import {WS_ORDERS_URL} from "../constants";
import AuthService from "../services/AuthService";
import FeedOrder from "../components/feed-order/feed-order";
import {Route, Switch, useHistory, useLocation, useRouteMatch} from "react-router-dom";
import FeedOrderDetails from "../components/feed-order/feed-order-details";
import {feedCloseConnectionAction, feedOpenConnectionAction} from "../services/slices/feedSlice";
import ProfileMenu from "../components/profile-menu/profile-menu";
import cl from './styles.module.css';

const OrdersPage: React.FC = () => {

    const location = useLocation();
    const history = useHistory();

    const {path} = useRouteMatch<{ path: string }>();

    const dispatch = useDispatch();
    const orders = useSelector(state => state.feed.orders);
    const sortedOrders = useMemo(() => [...orders].sort((a, b) => b.number - a.number), [orders]);

    useEffect(() => {
        dispatch(feedOpenConnectionAction(WS_ORDERS_URL + AuthService.getToken('token')));

        return () => {
            dispatch(feedCloseConnectionAction());
        }
    }, [dispatch]);

    useEffect(() => {
        errorMessage && alert(errorMessage);
    }, [errorMessage])

    const onClickHandler = (orderId: number) => () => history.push(`/profile/orders/${orderId}`, {feed: location})

    return (<Switch>
        <Route path={`${path}`} render={() => (<div className={`${cl.orders_container} custom-scroll`}>
                <div className={cl.orders_cards_container}>
                    {sortedOrders.map(order => (
                            <FeedOrder order={order} key={order._id} onClick={onClickHandler(order.number)}/>
                        )
                    )}
                </div>
            </div>
        )} exact>
        </Route>
        <Route path={`${path}/:id`} component={FeedOrderDetails} exact/>
    </Switch>)
};

export default OrdersPage;