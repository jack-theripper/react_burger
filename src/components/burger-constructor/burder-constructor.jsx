import React from "react";
import PropTypes from 'prop-types';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import {Button, ConstructorElement, CurrencyIcon, CheckMarkIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypeBurger from '../../utils/type-burger';
import Modal from "../modal/modal";
import cl from './burger-constructor.module.css';

/**
 * BurgerConstructor — текущий состав бургера.
 */
class BurgerConstructor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			bun: props.ingredients.find(ingredient => ingredient.type === 'bun'),
			ingredients: props.ingredients.filter(ingredient => ingredient.type !== 'bun'),
			isModalOpen: false,
		}
	}
	
	toggleModal = () => {
		this.setState({...this.state, isModalOpen: !this.state.isModalOpen});
	}

	render() {
		return (
			<div className={cl.container}>
				<Modal show={this.state.isModalOpen} onClose={this.toggleModal}>
					<div className="text-center mb-10">
						<p className="text text_type_digits-large">034536</p>
						<p className="text text_type_main-default">идентификатор заказа</p>
						<div className="icon-size text-120">
							<CheckMarkIcon type="primary" />
						</div>
						<p className="text text_type_main-default">Ваш заказ начали готовить</p>
						<p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
					</div>
				</Modal>
				
				<div className="flex pl-8 pl-2">
					<ConstructorElement type="top" isLocked={true} text={this.state.bun.name + ' (верх)'}
					                    price={this.state.bun.price} thumbnail={this.state.bun.image}/>
				</div>

				<div className={cl.list}>
					{this.state.ingredients.map(value => {
						return (
							<div className="flex flex-middle" key={value._id}>
								<a href="#" className="p-1"><DragIcon type="primary"/></a>
								<ConstructorElement text={value.name} price={value.price} thumbnail={value.image}/>
							</div>
						)
					})}
				</div>

				<div className="flex pl-8 pl-2">
					<ConstructorElement type="bottom" isLocked={true} text={this.state.bun.name + ' (низ)'}
					                    price={this.state.bun.price} thumbnail={this.state.bun.image}
					/>
				</div>
				<div className="flex flex-right">
					<div className="flex flex-middle">
						<p className="text text_type_digits-default mr-2">610</p>
						<CurrencyIcon type="primary"/>
					</div>
					<div className="ml-6">
						<Button type="primary" size="medium" onClick={this.toggleModal}>Оформить заказ</Button>
					</div>
				</div>
			</div>
		)
	}
}

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(PropTypeBurger.isRequired)
}

BurgerConstructor.defaultProps = {
	ingredients: []
}

export default BurgerConstructor;