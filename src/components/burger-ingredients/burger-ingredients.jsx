import React, {useEffect, useRef, useState} from "react";
import {Tab, Counter, CurrencyIcon, CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import PropTypeBurger from '../../utils/type-burger';
import Modal from "../modal/modal";
import cl from './burger-ingredients.module.css';

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
	const [activeIngr, setActiveIngr] = useState(null);
	
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
	}, [])
	
	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	}
	
	const openIngrInfo = (value) => {
		return () => {
			setIsModalOpen(true);
			setActiveIngr(value);
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
				{activeIngr && (
					<div className="text-center mb-10">
						<img src={activeIngr.image} alt=""/>
						<p className="text text_type_main-default">{activeIngr.name}</p>
						<div className="flex flex-gap flex-center mt-4">
							<div>
								<p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
								<p className="text text_type_digits-default text_color_inactive">{activeIngr.calories}</p>
							</div>
							<div>
								<p className="text text_type_main-default text_color_inactive">Белки, г</p>
								<p className="text text_type_digits-default text_color_inactive">{activeIngr.proteins}</p>
							</div>
							<div>
								<p className="text text_type_main-default text_color_inactive">Жиры, г</p>
								<p className="text text_type_digits-default text_color_inactive">{activeIngr.fat}</p>
							</div>
							<div>
								<p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
								<p className="text text_type_digits-default text_color_inactive">{activeIngr.carbohydrates}</p>
							</div>
						</div>
					</div>
				)}
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