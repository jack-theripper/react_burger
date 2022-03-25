import React, {useEffect, useRef, useState} from "react";
import {Tab, Counter, CurrencyIcon, CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import PropTypeBurger from '../../utils/type-burger';
import Modal from "../modal/modal";
import cl from './burger-ingredients.module.css';
import IngredientDetails from "../ingredient-details/ingredient-details";

/**
 * BurgerIngredients — список ингредиентов;
 */
const BurgerIngredients = (props) => {
	
	const groups = props.list.reduce((prev, curr) => {
		prev[curr.type] = prev[curr.type] || []
		prev[curr.type].push(curr);
		
		return prev;
	}, {});
	
	const [activeTab, setActiveTab] = useState(Object.keys(groups)[0] ?? null);
	const [viewport, setViewport] = useState('calc(100vh - 250px)');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedIngredient, setSelectedIngredient] = useState(null);
	
	const tabsScroll = useRef();
	
	const $refs = new Map(); // vue.js I love u
	
	const changeTab = (val) => {
		setActiveTab(val);
		$refs.get(val).scrollIntoView({block: 'start', behavior: 'smooth'});
	}
	
	const createRef = ref => el => {
		$refs.set(ref, el);
	}
	
	useEffect(() => {
		const boxRect = tabsScroll.current.getBoundingClientRect();
		setViewport('calc(100vh - ' + Math.ceil(boxRect.y + 10) + 'px)')
	}, [props.list])
	
	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	}
	
	const openIngrInfo = (value) => {
		return () => {
			setIsModalOpen(true);
			setSelectedIngredient(value);
		}
	}
	
	const titles = {
		bun: 'Булки',
		main: 'Начинки',
		sauce: 'Соусы'
	};
	
	return (
		<React.Fragment>
			<Modal show={isModalOpen} onClose={toggleModal} title="Детали ингредиента">
				<IngredientDetails ingredient={selectedIngredient} />
			</Modal>
			
			<div className={cl.tabs}>
				{Object.keys(groups).map(key =>
					<Tab value={key} key={key} active={activeTab === key}
					     onClick={changeTab}>{titles[key]}</Tab>
				)}
			</div>
			<div className={cl.scroll + ' custom-scroll'} ref={tabsScroll} style={{maxHeight: viewport}}>
				{Object.keys(groups).map(key => (
					<React.Fragment key={key}>
						<h2 className="margin" ref={createRef(key)}>{titles[key]}</h2>
						<ul className="grid p-5">
							{groups[key].map(values => (
								<li key={values._id} className="flex flex-center" onClick={openIngrInfo(values)}>
									<div className={cl.item + ' relative'}>
										<img src={values.image} alt={values.name} />
										<Counter count={1} size="default" />
										<p className={cl.digits}>
											<span className="pr-1">{values.price}</span>
											<CurrencyIcon type="primary"/>
										</p>
										<p className="m-1">{values.name}</p>
									</div>
								</li>
							))}
						</ul>
					</React.Fragment>
				))}
			</div>
		</React.Fragment>
	)
};

BurgerIngredients.propTypes = {
	list: PropTypes.arrayOf(PropTypeBurger.isRequired)
}

BurgerIngredients.defaultProps = {
	list: []
}

export default BurgerIngredients;