import React, {useContext, useMemo, useState} from "react";
import {Button, ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import cl from './burger-constructor.module.css';
import OrderDetails from "../order-details/order-details";
import {OrderContext} from "../../services/context";
import Price from "../price/price";

/**
 * BurgerConstructor — текущий состав бургера.
 */
const BurgerConstructor = () => {
	
	const order = useContext(OrderContext);

	const bun = order.list.find(ingredient => ingredient.type === 'bun');
	const ingredients = order.list.filter(ingredient => ingredient.type !== 'bun');
	const price = useMemo(() => order.list.reduce((curr, prev) => prev.price + curr, 0), [order.list]);
	
	const [isModalOpen, setIsModalOpen] = useState(false);
	
	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	}
	
	const [orderDetails, setOrderDetails] = useState({
		id: order.orderNumber,
		status: 'processing'
	});
	
	return (
		<div>
			<div className={cl.container}>
				<Modal show={isModalOpen} onClose={toggleModal}>
					<OrderDetails order={orderDetails}/>
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
				<div className="flex flex-middle flex-right">
					<Price value={price} />
					<div className="ml-6">
						<Button type="primary" size="medium" onClick={toggleModal}>Оформить заказ</Button>
					</div>
				</div>
			</div>
		</div>
	)
};

export default BurgerConstructor;