import React, {useMemo} from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../services/store";
import cl from './feed-order.module.css';
import {IngredientType} from "../../types/types";
import FeedOrderItem from "./feed-order-item";
import Price from "../price/price";

interface FeedOrderDetailsParams {
    id: string;
}

const FeedOrderDetails: React.FC = () => {

    const {id} = useParams<FeedOrderDetailsParams>();
    const orders = useSelector((state: RootState) => state.feed.orders);
    const ingredients = useSelector<RootState, IngredientType[]>(state => state.ingredients);

    const order = useMemo(() => {
        // @ts-ignore
        return orders.find(order => order.number == id)
    }, [orders, id]);

    const totalPrice = useMemo(() => {
        return order?.ingredients.reduce((value, item) => {
            return value + (ingredients.find(value => value._id == item)?.price || 0);
        }, 0) || 0;
    }, [order, ingredients]);

    return order ? (<>
        <p className={'text_type_digits-default text-center'}>#{order.number}</p>
        <h3 className={'text_type_main-medium'}>{order.name}</h3>
        <p className={order.status == 'done' ? cl.status_done : ''}>
            {order.status == 'created' ? 'Создан' : (order.status == 'pending' ? 'В работе' : 'Выполнен')}
        </p>

        <h3>Состав:</h3>

        <div style={{
            overflow: "auto",
            maxHeight: '20em',
            gap: '15px 0px',
            paddingRight: '24px',
            display: 'flex',
            flexDirection: 'column',
            scrollbarWidth: 'thin'
        }} className={'custom-scroll'}>
            {order.ingredients.map(item => {

                const ingredient = ingredients.find(value => value._id == item);

                if ( ! ingredient) {
                    return ;
                }

                return (
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '16px'
                    }}>
                    <FeedOrderItem ingredient={ingredient} />

                        <div style={{flexGrow: 1}}>{ingredient.name}</div>
                        <Price value={ingredient.price} />
                    </div>
                )


            })}



        </div>

        <div style={{display: 'flex'}}>
            <span style={{flexGrow: 1}}>{order.createdAt}</span>
            <Price value={totalPrice} />
        </div>

    </>) : <h2>Заказ не найден</h2>;
};

export default FeedOrderDetails;