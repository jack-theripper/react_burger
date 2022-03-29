import React, {useContext, useState} from "react";
import PropTypes from 'prop-types';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import {Button, ConstructorElement, CurrencyIcon, CheckMarkIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import cl from './burger-constructor.module.css';
import OrderDetails from "../order-details/order-details";
import {IngredientPropType} from "../../propTypes";
import {OrderContext} from "../../services/context";

/**
 * BurgerConstructor — текущий состав бургера.
 */
const BurgerConstructor = () => {
	
	const order = useContext(OrderContext);
	
	// @todo: state?
	const bun = order.list.find(ingredient => ingredient.type === 'bun');
	const ingredients = order.list.filter(ingredient => ingredient.type !== 'bun');
	
	const [isModalOpen, setIsModalOpen] = useState(false);
	
	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	}

	const [orderDetails, setOrderDetails] = useState({
		id: order.orderNumber,
		status: 'processing'
	});

	return (
		<div className={cl.container}>
			<Modal show={isModalOpen} onClose={toggleModal}>
				<OrderDetails order={orderDetails} />
			</Modal>
			
			<div className="flex pl-8 pl-2">
				{bun && (<ConstructorElement type="top" isLocked={true} text={bun.name + ' (верх)'}
				                    price={bun.price} thumbnail={bun.image}/>)}
			</div>
			
			<div className={cl.list + ' custom-scroll'}>
				{ingredients.map(value => {
					return (
						<div className="flex flex-middle" key={value._id}>
							<a href="#" className="p-1"><DragIcon type="primary"/></a>
							<ConstructorElement text={value.name} price={value.price} thumbnail={value.image}/>
						</div>
					)
				})}
			</div>
			
			<div className="flex pl-8 pl-2">
				{bun && (<ConstructorElement type="bottom" isLocked={true} text={bun.name + ' (низ)'}
				                    price={bun.price} thumbnail={bun.image}
				/>)}
			</div>
			<div className="flex flex-right">
				<div className="flex flex-middle">
					<p className="text text_type_digits-default mr-2">610</p>
					<CurrencyIcon type="primary"/>
				</div>
				<div className="ml-6">
					<Button type="primary" size="medium" onClick={toggleModal}>Оформить заказ</Button>
				</div>
			</div>
		</div>
	)
};

export default BurgerConstructor;