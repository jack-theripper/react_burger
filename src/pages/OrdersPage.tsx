import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../services/store";
import {socketCloseConnectionAction, socketOpenConnectionAction} from "../services/actions/socketActions";
import {WS_ORDERS_URL} from "../constants";
import {orderReceiveUserHistoryAction} from "../services/actions/orderActions";
import AuthService from "../services/AuthService";
import FeedOrder from "../components/feed-order/feed-order";
import {Route, Switch, useHistory, useLocation, useRouteMatch} from "react-router-dom";
import FeedOrderDetails from "../components/feed-order/feed-order-details";
import cl from './styles.module.css';

const OrdersPage: React.FC = () => {

    const location = useLocation();
    const history = useHistory();

    const {path} = useRouteMatch<{ path: string }>();

    const dispatch = useDispatch<AppDispatch>();
    const errorMessage = useSelector((state: RootState) => state.order.errorMessage);

    const orders = useSelector((state: RootState) => state.order.history.orders);

    useEffect(() => {
        dispatch(socketOpenConnectionAction(WS_ORDERS_URL + AuthService.getToken('token'), orderReceiveUserHistoryAction));

        return () => {
            dispatch(socketCloseConnectionAction());
        }
    }, [dispatch]);

    useEffect(() => {
        errorMessage && alert(errorMessage);
    }, [errorMessage])

    const onClickHandler = (orderId: number) => () => history.push(`/profile/orders/${orderId}`, {feed: location})

    return (<Switch>
        <Route path={`${path}`} render={() => (<div className={`${cl.orders_container} custom-scroll`}>
                <div className={cl.orders_cards_container}>
                    {orders.map(order => (
                            <FeedOrder order={order} key={order.number} onClick={onClickHandler(order.number)}/>
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