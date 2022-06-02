import React, {useMemo} from 'react';
import {useLocation, useParams} from "react-router-dom";
import {useSelector} from "../../services/store";
import FeedOrderItem from "./feed-order-item";
import Price from "../price/price";
import cl from './feed-order.module.css';

const FeedOrderDetails: React.FC = () => {

    const {id} = useParams<{ id: any }>();

    const location = useLocation<{ feed: any }>();
    const isModal = location.state && location.state?.feed != null;

    const orders = useSelector((state) => state.feed.orders);
    const order = useMemo(() => orders.find(order => order.number == id), [orders, id]);

    const allIngredients = useSelector(state => state.ingredients);
    const ingredients = useMemo(() => allIngredients.filter(ingredient => order?.ingredients.includes(ingredient._id)), [order, allIngredients]);

    const count = useMemo(() => {
        return order?.ingredients.reduce(function (prev: { [k: string]: number }, cur) {
            prev[cur] = (prev[cur] || 0) + 1;
            return prev;
        }, {}) || {};
    }, [order]);

    const totalPrice = useMemo(() =>
        ingredients.reduce((value, ingredient) => value + ingredient.price * (count[ingredient._id] || 1), 0) || 0, [count, ingredients]);

    return order ? (
        <div className={isModal ? '' : cl.container}>
            <p className={'text_type_digits-default text-center'}>#{order.number}</p>
            <h3 className={'text_type_main-medium'}>{order.name}</h3>
            <p className={order.status == 'done' ? cl.status_done : ''}>
                {order.status == 'created' ? 'Создан' : (order.status == 'pending' ? 'В работе' : 'Выполнен')}
            </p>
            <h3>Состав:</h3>
            <div className={`${cl.details_container} custom-scroll`}>
                {ingredients.map(ingredient => <div className={cl.details_row} key={ingredient._id}>
                    <FeedOrderItem ingredient={ingredient}/>
                    <div className={cl.details_row_title}>{ingredient.name}</div>
                    <span className={'text_type_digits-default'}>{count[ingredient._id] || 1} x </span>
                    <Price value={ingredient.price}/>
                </div>)}
            </div>
            <div className={`${cl.date_container} mt-10`}>
                <span className={'text_type_main-default'}>{new Date(order.createdAt).toLocaleString()}</span>
                <Price value={totalPrice}/>
            </div>
        </div>
    ) : <h2>Заказ не найден</h2>;
};

export default FeedOrderDetails;