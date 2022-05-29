import React from 'react';
import cl from "./styles.module.css";
import FeedOrderDetails from "../components/feed-order/feed-order-details";

const FeedViewPage: React.FC = () => {
    return (<div className={cl.container}>
        <h3 className="text text text_type_main-large mt-30">Детали заказа</h3>
        <FeedOrderDetails />
    </div>);
};

export default FeedViewPage;