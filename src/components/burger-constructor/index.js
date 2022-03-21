import React from "react";
import PropTypes from 'prop-types';
import BurgerIngredients from "../burger-ingredients";
import {Button, ConstructorElement, CurrencyIcon, CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import './index.css';
import PropTypeBurger from './../../utils/type-burger';
import Modal from "../modal/Modal";
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
			
			
			<div className="constr-container">
				
		
				<Modal show={this.state.isModalOpen} onClose={this.toggleModal}>
					<p className="text text_type_digits-large">1234567890</p>
					<p>идентификатор заказа</p>
					<CheckMarkIcon type="primary"/>
					<p>Ваш заказ начали готовить</p>
					<p>Дождитесь готовности на орбитальной станции</p>
				</Modal>
				
				<div className="flex">
					<ConstructorElement type="top" isLocked={true} text={this.state.bun.name}
					                    price={this.state.bun.price} thumbnail={this.state.bun.image}/>
				</div>

				<div className="main">
					{this.state.ingredients.map(value => {
						return (
							<div className="flex" key={value._id}>
								<ConstructorElement text={value.name}
								                    price={value.price}
								                    thumbnail={value.image}
								/>
							</div>
						)
					})}
				</div>

				<div className="flex">
					<ConstructorElement type="bottom" isLocked={true} text={this.state.bun.name}
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