import React, {useMemo} from 'react';
import {FeedOrderType} from "../../types/types";
import cl from './feed-order.module.css';

interface FeedOrderSummaryProps {
    orders: FeedOrderType[]
}

const FeedOrderSummary: React.FC<FeedOrderSummaryProps> = ({orders}) => {

    const doneOrders = useMemo(() => orders.filter(order => order.status == 'done'), [orders]);
    const pendingOrders = useMemo(() => orders.filter(order => order.status == 'pending'), [orders]);

    return (
        <div className={'grid'}>
            <div>
                Готовы:
                <ul className={`${cl.done_column} ${cl.column} text_type_digits-default mt-3`}>
                    {doneOrders.map(order => <li>{order.number}</li>)}
                </ul>
            </div>
            <div>
                В работе:
                <ul className={`${cl.column} text_type_digits-default mt-3`}>
                    {pendingOrders.map(order => <li>{order.number}</li>)}
                </ul>
            </div>
        </div>
    );
};

export default FeedOrderSummary;