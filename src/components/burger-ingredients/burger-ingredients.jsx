import React, {useEffect, useMemo, useRef, useState} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import Modal from "../modal/modal";
import cl from './burger-ingredients.module.css';
import IngredientDetails from "../ingredient-details/ingredient-details";
import {IngredientPropType} from "../../propTypes";
import {TITLES} from "../../constants";
import BurgerIngredientsList from "../burger-ingredients-list/burger-ingredients-list";

/**
 * BurgerIngredients — список ингредиентов;
 */
const BurgerIngredients = (props) => {

	const groups = useMemo(() => props.list.reduce((prev, curr) => { // ингредиенты по типам
		prev[curr.type] = prev[curr.type] || []
		prev[curr.type].push(curr);

		return prev;
	}, {}), [props.list]);

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
		setSelectedIngredient(value);
		setIsModalOpen(true);
	}

	return (
		<React.Fragment>
			<div className={cl.tabs}>
				{Object.keys(groups).map(key => (
					<Tab value={key} key={key} active={activeTab === key} onClick={changeTab}>{TITLES[key]}</Tab>
				))}
			</div>
			<div className={cl.scroll + ' custom-scroll'} ref={tabsScroll} style={{maxHeight: viewport}}>
				{Object.keys(groups).map(key => (
					<BurgerIngredientsList key={key} ref={createRef(key)} type={key} list={groups[key]} onClick={openIngrInfo} />
				))}
			</div>
			<Modal show={isModalOpen} onClose={toggleModal} title="Детали ингредиента">
				<IngredientDetails ingredient={selectedIngredient} />
			</Modal>
		</React.Fragment>
	)
};

BurgerIngredients.propTypes = {
	list: PropTypes.arrayOf(IngredientPropType.isRequired)
}

BurgerIngredients.defaultProps = {
	list: []
}

export default BurgerIngredients;