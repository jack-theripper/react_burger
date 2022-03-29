import React from 'react';
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {OrderPropType} from "../../propTypes";

/**
 * Детали заказа.
 */
const OrderDetails = ({order}) => {
	return (
		<div className="text-center mb-10">
			<p className="text text_type_digits-large">{order.orderNumber}</p>
			<p className="text text_type_main-default">идентификатор заказа</p>
			<div className="icon-size text-120">
				<CheckMarkIcon type="primary"/>
			</div>
			{order.orderNumber && (
				<>
					<p className="text text_type_main-default">Ваш заказ начали готовить</p>
					<p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
				</>
			)}
		</div>
	);
};

OrderDetails.propType = {
	order: OrderPropType.isRequired
}

export default OrderDetails;