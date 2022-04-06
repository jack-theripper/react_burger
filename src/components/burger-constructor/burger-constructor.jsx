import React, {useEffect, useMemo, useState} from "react";
import {Button, ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import cl from './burger-constructor.module.css';
import OrderDetails from "../order-details/order-details";
import Price from "../price/price";
import {useWaiting} from "../../hooks/useWaiting";
import {useDispatch, useSelector} from "react-redux";
import {orderDetailsChangeAction} from "../../services/actions/orderActions";

/**
 * BurgerConstructor — текущий состав бургера.
 */
const BurgerConstructor = () => {

	const list = useSelector(state => state.order.ingredients);
	const order = useSelector(state => state.order.details);

	const dispatch = useDispatch();

	const bun = list.find(ingredient => ingredient.type === 'bun');
	const ingredients = list.filter(ingredient => ingredient.type !== 'bun');
	const price = useMemo(
		() => bun?.price * 2 + ingredients.reduce((curr, prev) => prev.price + curr, 0),
		[list]
	);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	}

	const [createOrder, isOrderCreating, hasOrderError] = useWaiting(async () => {
		//setOrderState({...order, orderNumber: null});
		//await OrderService.create(list.map(ingredient => ingredient._id))
		//	.then(response => response.success && setOrderState({...order, orderNumber: response.order.number}))
	});

	useEffect(() => isModalOpen && createOrder(), [isModalOpen])

	return (
		<div>
			<div className={cl.container}>
				<div className="flex pl-8 pl-2">
					{bun && (
						<ConstructorElement type="top" isLocked={true} text={bun.name + ' (верх)'} price={bun.price}
						                    thumbnail={bun.image}/>
					)}
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
					{bun && (
						<ConstructorElement type="bottom" isLocked={true} text={bun.name + ' (низ)'} price={bun.price}
						                    thumbnail={bun.image}/>
					)}
				</div>
				<div className="flex flex-middle flex-right">
					<Price value={price}/>
					<div className="ml-6">
						<Button type="primary" size="medium" onClick={toggleModal}>Оформить заказ</Button>
					</div>
				</div>
			</div>
			<Modal show={isModalOpen} onClose={toggleModal}>
				{(isOrderCreating || hasOrderError) ? <h2 className="text-center pb-4">Заказ обрабатывается {hasOrderError}</h2>
					: <OrderDetails order={order}/>}
			</Modal>
		</div>
	)
};

export default BurgerConstructor;