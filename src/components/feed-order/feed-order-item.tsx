import React from 'react';
import {IngredientType} from "../../types/types";
import cl from "./feed-order.module.css";

interface FeedOrderItem {
    ingredient: IngredientType;
    overlay?: number;
}

const FeedOrderItem: React.FC<FeedOrderItem> = ({ingredient, overlay}) => {
    return (
        <div className={cl.item}>
            <img src={ingredient.image_mobile} title={ingredient.name} width={'auto'} alt=""/>
            {overlay && (
                <div className={cl.item_overlay}>+{overlay}</div>
            )}
        </div>
    );
};

export default FeedOrderItem;