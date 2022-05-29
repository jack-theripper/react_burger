import React, {useMemo} from 'react';
import cl from "./feed-order.module.css";
import Price from "../price/price";
import {FeedOrderType, IngredientType} from "../../types/types";
import {useSelector} from "react-redux";
import {RootState} from "../../services/store";
import FeedOrderItem from "./feed-order-item";

interface FeedOrderProps {
    order: FeedOrderType;
    onClick?: () => void;
}

const FeedOrder: React.FC<FeedOrderProps> = ({order, onClick}) => {

    const allIngredients = useSelector<RootState, IngredientType[]>(state => state.ingredients);
    const {items, price} = useMemo(() => {

        let ingredients = [];
        let ingredient = null;

        for (let i = 0; i < order.ingredients.length; i++) {
            if ((ingredient = allIngredients.find(item => item._id === order.ingredients[i]))) {
                ingredients.push(ingredient);
            }
        }

        return {
            items: ingredients.reverse(),
            price: ingredients.reduce((value, ingredient) => value + ingredient.price, 0)
        };

    }, [order.ingredients, allIngredients]);

    return (
        <div className={cl.box} onClick={onClick}>
            <div className={cl.header}>
                <span className={'text_type_digits-default'}>#{order.number}</span>
                <span className={'text_type_main-default'}>Сегодня, 16:20 i-GMT+3</span>
            </div>
            <h3 className={cl.center + ' text_type_main-medium'}>{order.name}</h3>
            <div className={cl.center}>
                <div className={cl.items}>
                    {items.length > 5 && <FeedOrderItem ingredient={items[5]} overlay={items.length}/>}
                    {items.slice(0, 5).map((item, index) => <FeedOrderItem ingredient={item} key={index} />)}
                </div>
                <Price value={price}/>
            </div>
        </div>
    );
};

export default FeedOrder;