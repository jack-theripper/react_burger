import React, {useEffect, useMemo, useRef, useState} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import cl from './burger-ingredients.module.css';
import IngredientDetails from "../ingredient-details/ingredient-details";
import {TITLES} from "../../constants";
import BurgerIngredientsList from "../burger-ingredients-list/burger-ingredients-list";
import {useDispatch, useSelector} from "react-redux";
import {ingredientDetailsSetAction} from "../../services/actions/ingredientDetailsActions";

/**
 * BurgerIngredients — список ингредиентов;
 */
const BurgerIngredients = () => {

	const dispatch = useDispatch();

	const list = useSelector(state => state.ingredients);
	const groups = useMemo(() => list.reduce((prev, curr) => { // ингредиенты по типам
		prev[curr.type] = prev[curr.type] || []
		prev[curr.type].push(curr);

		return prev;
	}, {}), [list]);

	const [activeTab, setActiveTab] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const $refs = new Map(); // vue.js I love u

	const changeTab = (val) => {
		setActiveTab(val);
		$refs.get(val).scrollIntoView({block: 'start', behavior: 'smooth'});
	}

	const createRef = ref => element => {
		$refs.set(ref, element);

		if (element != null) {
			observer.observe(element);
		}
	}

	useEffect(() => {
		setActiveTab(Object.keys(groups)[0] ?? null); // Это кошмар какой-то.
	}, [list])

	const toggleModal = () => {
		isModalOpen && dispatch(ingredientDetailsSetAction(null));
		setIsModalOpen(!isModalOpen);
	}

	const openIngrInfo = (value) => {
		dispatch(ingredientDetailsSetAction(value));
		setIsModalOpen(true);
	}

	const scrollRef = useRef();
	const [scrollRatio, setScrollRatio] = useState({});

	const observer = useMemo(() => new IntersectionObserver((entries) => {
		entries.forEach(({target, intersectionRatio}) => {
			setScrollRatio(prev => {
				return {...prev, [target.getAttribute('id')]: intersectionRatio}
			});
		})
	}, {
		root: scrollRef.current,
		threshold: [0.0, 0.5]
	}), []);

	useEffect(() => {
		let previous = [null, 0];

		for (const [key, value] of Object.entries(scrollRatio)) {
			if (value > previous[1]) {
				previous = [key, value]
			}
		}

		if (previous[0] != null) {
			setActiveTab(previous[0]);
		}
	}, [scrollRatio]);

	return (
		<div>
			<div className={cl.tabs}>
				{Object.keys(groups).map(key => (
					<Tab value={key} key={key} active={activeTab === key} onClick={changeTab}>{TITLES[key]}</Tab>
				))}
			</div>
			<div className={cl.scroll + ' custom-scroll'} ref={scrollRef}>
				{Object.keys(groups).map(key => (
					<BurgerIngredientsList key={key} ref={createRef(key)} type={key} list={groups[key]} onClick={openIngrInfo} />
				))}
			</div>
			<Modal show={isModalOpen} onClose={toggleModal} title="Детали ингредиента">
				<IngredientDetails />
			</Modal>
		</div>
	)
};

export default BurgerIngredients;