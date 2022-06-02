import React, {useEffect, useMemo, useState} from "react";
import {Button, ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import cl from './burger-constructor.module.css';
import OrderDetails from "../order-details/order-details";
import Price from "../price/price";
import {useDispatch, useSelector} from "../../services/store";
import {
	orderAddIngredientAction,
	orderCreateAction,
	orderIngredientsRemoveAllAction,
	orderRemoveIngredientAction
} from "../../services/actions/orderActions";
import {useDrop} from "react-dnd";
import BurgerConstructorItem from "./burger-constructor-item";
import {IngredientType} from "../../types/types";

const BurgerConstructor: React.FC = () => {

	const dispatch = useDispatch();

	const list = useSelector(state => state.order.ingredients);
	const bun = list.find(ingredient => ingredient.type === 'bun');
	const ingredients = list.filter(ingredient => ingredient.type !== 'bun');
	const price = useMemo(() =>
			(bun?.price || 0) * 2 + ingredients.reduce((curr, prev) => prev.price + curr, 0),
		[list]
	);

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const hasOrderError = useSelector(state => state.order.errorMessage);

	useEffect(() => {
		isModalOpen && dispatch(orderCreateAction());
	}, [isModalOpen, dispatch])

	const handleRemove = (ingredient: IngredientType) => {
		return () => dispatch(orderRemoveIngredientAction(ingredient))
	}

	const isLogged = useSelector(state => state.user.isLogged);

	const handleCloseModal = () => {
		if (isLogged) {
			dispatch(orderIngredientsRemoveAllAction());
		}

		setIsModalOpen(false);
	};

	const [, dropRef] = useDrop<IngredientType>({
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
			<div className={cl.container} ref={dropRef}>
				<div className="flex pl-8 pl-2">
					{bun && (
						<ConstructorElement type="top" isLocked={true} text={bun.name + ' (верх)'} price={bun.price}
						                    thumbnail={bun.image}/>
					)}
				</div>
				<div className={cl.list + ' custom-scroll'}>
					{ingredients.map(value =>
						<BurgerConstructorItem key={value.unique} ingredient={value} handleClose={handleRemove} />
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
						<Button type="primary" size="medium" onClick={() => setIsModalOpen(true)} disabled={!bun}>Оформить заказ</Button>
					</div>
				</div>
			</div>
			{isModalOpen && (<Modal onClose={handleCloseModal}>
				{hasOrderError && <h2 className="text-center pb-4">Произошла ошибка {hasOrderError}</h2>}
				{!hasOrderError && <OrderDetails />}
			</Modal>)}
		</div>
	)
};

export default BurgerConstructor;