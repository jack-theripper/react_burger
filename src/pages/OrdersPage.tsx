import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../services/store";
import {WS_ORDERS_URL} from "../constants";
import AuthService from "../services/AuthService";
import FeedOrder from "../components/feed-order/feed-order";
import {Route, Switch, useHistory, useLocation, useRouteMatch} from "react-router-dom";
import FeedOrderDetails from "../components/feed-order/feed-order-details";
import {feedCloseConnectionAction, feedOpenConnectionAction} from "../services/slices/feedSlice";
import cl from './styles.module.css';
import ProfileMenu from "../components/profile-menu/profile-menu";

const OrdersPage: React.FC = () => {

    const location = useLocation();
    const history = useHistory();

    const {path} = useRouteMatch<{ path: string }>();

    const dispatch = useDispatch<AppDispatch>();
    const orders = useSelector((state: RootState) => state.feed.orders);

    useEffect(() => {
        dispatch(feedOpenConnectionAction(WS_ORDERS_URL + AuthService.getToken('token')));

        return () => {
            dispatch(feedCloseConnectionAction());
        }
    }, [dispatch]);

    const onClickHandler = (orderId: number) => () => history.push(`/profile/orders/${orderId}`, {background: location})

    return (<Switch>
        <Route path={path} exact>
            <div className={'width-1-4'}>
                <ProfileMenu/>
            </div>
            <div className={`${cl.profile_container} custom-scroll`}>
                <div className={cl.orders_cards_container}>
                    {orders.map(order => (
                            <FeedOrder order={order} key={order._id} onClick={onClickHandler(order.number)}/>
                        )
                    )}
                </div>
            </div>
        </Route>

        <Route path={`${path}/:id`} component={FeedOrderDetails} exact/>
    </Switch>)
};

export default OrdersPage;