import React from 'react';
import {useParams} from "react-router-dom";

interface OrderViewPageParams {
    id: string
}

const OrderViewPage: React.FC = () => {
    const params = useParams<OrderViewPageParams>();

    return (
        <div>
            OrderViewPage: # {params.id}
        </div>
    );
};

export default OrderViewPage;