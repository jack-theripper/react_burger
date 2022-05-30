import React, {useMemo} from 'react';
import {useLocation, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../services/store";
import {IngredientType} from "../../types/types";
import FeedOrderItem from "./feed-order-item";
import Price from "../price/price";
import cl from './feed-order.module.css';

const FeedOrderDetails: React.FC = () => {

    const {id} = useParams<{ id: string }>();

    const location = useLocation<{ feed: any }>();
    const isModal = location.state && location.state?.feed != null;

    const isLogged = useSelector<RootState, boolean>(state => state.user.isLogged);
    const orders = useSelector((state: RootState) => isLogged ? state.order.history.orders : state.feed.orders);

    const ingredients = useSelector<RootState, IngredientType[]>(state => state.ingredients);

    // @ts-ignore
    const order = useMemo(() => orders.find(order => order.number == id), [orders, id]);
    const totalPrice = useMemo(() =>
        order?.ingredients.reduce((value, item) =>
            value + (ingredients.find(value => value._id == item)?.price || 0), 0) || 0, [order, ingredients]);

    return order ? (
        <div className={isModal ? '' : cl.container}>
            <p className={'text_type_digits-default text-center'}>#{order.number}</p>
            <h3 className={'text_type_main-medium'}>{order.name}</h3>
            <p className={order.status == 'done' ? cl.status_done : ''}>
                {order.status == 'created' ? 'Создан' : (order.status == 'pending' ? 'В работе' : 'Выполнен')}
            </p>
            <h3>Состав:</h3>
            <div className={`${cl.details_container} custom-scroll`}>
                {order.ingredients.map(item => {
                    const ingredient = ingredients.find(value => value._id == item);
                    return ingredient ? (<div className={cl.details_row} key={item}>
                        <FeedOrderItem ingredient={ingredient}/>
                        <div className={cl.details_row_title}>{ingredient.name}</div>
                        <Price value={ingredient.price}/>
                    </div>) : null
                })}
            </div>
            <div className={`${cl.date_container} mt-10`}>
                <span className={'text_type_main-default'}>{new Date(order.createdAt).toLocaleString()}</span>
                <Price value={totalPrice}/>
            </div>
        </div>
    ) : <h2>Заказ не найден</h2>;
};

export default FeedOrderDetails;