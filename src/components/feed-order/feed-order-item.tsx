import React from 'react';
import {IngredientType} from "../../types/types";
import cl from "./feed-order.module.css";

interface FeedOrderItem {
    ingredient: IngredientType
}

const FeedOrderItem: React.FC<FeedOrderItem> = ({ingredient}) => {
    return (
        <div className={cl.item}>
            <img src={ingredient.image} title={ingredient.name} width={'auto'} alt=""/>
        </div>
    );
};

export default FeedOrderItem;