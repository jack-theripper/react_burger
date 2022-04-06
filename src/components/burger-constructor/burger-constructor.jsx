import React, {useEffect, useMemo, useState} from "react";
import {Button, ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import cl from './burger-constructor.module.css';
import OrderDetails from "../order-details/order-details";
import Price from "../price/price";
import {useWaiting} from "../../hooks/useWaiting";
import {useDispatch, useSelector} from "react-redux";
import {
	orderAddIngredientAction,
	orderCreateAction,
	orderRemoveIngredientAction
} from "../../services/actions/orderActions";
import {useDrop} from "react-dnd";
import BurgerConstructorItem from "./burger-constructor-item";

/**
 * BurgerConstructor — текущий состав бургера.
 */
const BurgerConstructor = () => {

	const dispatch = useDispatch();

	const list = useSelector(state => state.order.ingredients);
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
		dispatch(orderCreateAction()); // @todo: Обработать ошибки для получение hasOrderError
	});

	useEffect(() => isModalOpen && createOrder(), [isModalOpen])

	const handleClose = (ingredient) => {
		return () => dispatch(orderRemoveIngredientAction(ingredient))
	}

	const [, dropTarget] = useDrop({
		accept: 'ingredient',
		drop(ingredient) {
			if (ingredient.type === 'bun' && bun) { // @todo: bun._id === ingredient._id) -> return ;
				dispatch(orderRemoveIngredientAction(bun));
			}

			dispatch(orderAddIngredientAction(ingredient))
		}
	});

	return (
		<div>
			<div className={cl.container} ref={dropTarget}>
				<div className="flex pl-8 pl-2">
					{bun && (
						<ConstructorElement type="top" isLocked={true} text={bun.name + ' (верх)'} price={bun.price}
						                    thumbnail={bun.image}/>
					)}
				</div>
				<div className={cl.list + ' custom-scroll'}>
					{ingredients.map(value =>
						<BurgerConstructorItem key={value.unique} ingredient={value} handleClose={handleClose} />
					)}
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
					: <OrderDetails />}
			</Modal>
		</div>
	)
};

export default BurgerConstructor;