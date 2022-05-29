import React, {useMemo} from 'react';
import cl from "./feed-order.module.css";
import Price from "../price/price";
import {FeedOrderType, IngredientType} from "../../types/types";
import {useSelector} from "react-redux";
import {RootState} from "../../services/store";

interface FeedOrderProps {
    order: FeedOrderType;
}

const FeedOrder: React.FC<FeedOrderProps> = ({order}) => {

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

    }, [order, allIngredients]);

    return (
        <div className={cl.box}>
            <div className={cl.header}>
                <span className={'text_type_digits-default'}>#{order.number}</span>
                <span className={'text_type_main-default'}>Сегодня, 16:20 i-GMT+3</span>
            </div>
            <h3 className={cl.center + ' text_type_main-medium'}>
                {order.name}
            </h3>
            <p className={'text_type_main-default'}>Создан</p>
            <div className={cl.center}>
                <div className={cl.items}>

                    {/*{items.map(item => (
                        <FeedOrderItem ingredient={item} />
                    ))}*/}


                    {/*<div className={cl.item}>*/}
                    {/*    <img src="https://code.s3.yandex.net/react/code/core.png" alt=""/>*/}
                    {/*    <div style={{*/}
                    {/*        background: '#1C1C21',*/}
                    {/*        opacity: '0.6',*/}
                    {/*        position: 'absolute',*/}
                    {/*        top: 0, left: 0, bottom: 0, right: 0, textAlign: "center", paddingTop: '30%'*/}
                    {/*    }}>*/}
                    {/*        +3*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                </div>

                <div>
                    <Price value={price}/>
                </div>
            </div>
        </div>
    );
};

export default FeedOrder;