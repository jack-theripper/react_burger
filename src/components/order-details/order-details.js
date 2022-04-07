import React from 'react';
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";

/**
 * Детали заказа.
 */
const OrderDetails = () => {
	
	const order = useSelector(state => state.order.details);
	
	return (
		<div className="text-center mb-10">
			{!order.orderNumber && <h2>Ваш заказ обрабатывается...</h2>}
			{order.orderNumber && (
				<>
					<p className="text text_type_digits-large">{order.orderNumber}</p>
					<p className="text text_type_main-default">идентификатор заказа</p>
					<div className="icon-size text-120">
						<CheckMarkIcon type="primary"/>
					</div>
					<p className="text text_type_main-default">Ваш заказ начали готовить</p>
					<p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной
						станции</p>
				</>
			)}
		</div>
	);
};

export default OrderDetails;