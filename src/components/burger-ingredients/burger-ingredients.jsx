import React from "react";
import {Tab, Counter, CurrencyIcon, CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import PropTypeBurger from '../../utils/type-burger';
import Modal from "../modal/modal";
import cl from './burger-ingredients.module.css';

/**
 * BurgerIngredients — список ингредиентов;
 */
class BurgerIngredients extends React.Component {

	constructor(props) {
		super(props);

		const groups = props.list.reduce((prev, curr) => {
			prev[curr.type] = prev[curr.type] || []
			prev[curr.type].push(curr);

			return prev;
		}, {});

		this.state = {
			activeTab: Object.keys(groups)[0] ?? null,
			groups,
			viewport: 'calc(100vh - 250px)',
			isModalOpen: false,
			activeIngr: null,
		}

		this.tabsScroll = React.createRef();
	}

	$refs = new Map(); // vue.js I love u

	changeTab = (val) => {
		this.setState({...this.state, activeTab: val});
		this.$refs.get(val).scrollIntoView({block: 'start', behavior: 'smooth'});
	}

	createRef = ref => el => {
		this.$refs.set(ref, el);
	}

	componentDidMount() {
		const boxRect = this.tabsScroll.current.getBoundingClientRect();
		this.setState({...this.state, viewport: 'calc(100vh - ' + Math.ceil(boxRect.y + 10) + 'px)'});
	}

	toggleModal = () => {
		this.setState({...this.state, isModalOpen: !this.state.isModalOpen});
	}

	openIngrInfo = (value) => {
		return () => this.setState({isModalOpen: true, activeIngr: value});
	}

	render() {

		const titles = {
			bun: 'Булки',
			main: 'Начинки',
			sauce: 'Соусы'
		};

		return (
			<React.Fragment>

				<Modal show={this.state.isModalOpen} onClose={this.toggleModal} title="Детали ингредиента">
					{this.state.activeIngr && (
						<div className="text-center mb-10">
							<img src={this.state.activeIngr.image} alt=""/>
							<p className="text text_type_main-default">{this.state.activeIngr.name}</p>
							<div className="flex flex-gap flex-center mt-4">
								<div>
									<p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
									<p className="text text_type_digits-default text_color_inactive">{this.state.activeIngr.calories}</p>
								</div>
								<div>
									<p className="text text_type_main-default text_color_inactive">Белки, г</p>
									<p className="text text_type_digits-default text_color_inactive">{this.state.activeIngr.proteins}</p>
								</div>
								<div>
									<p className="text text_type_main-default text_color_inactive">Жиры, г</p>
									<p className="text text_type_digits-default text_color_inactive">{this.state.activeIngr.fat}</p>
								</div>
								<div>
									<p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
									<p className="text text_type_digits-default text_color_inactive">{this.state.activeIngr.carbohydrates}</p>
								</div>
							</div>
						</div>
					)}
				</Modal>

				<div className={cl.tabs}>
					{Object.keys(this.state.groups).map(key =>
						<Tab value={key} key={key} active={this.state.activeTab === key}
						     onClick={this.changeTab}>{titles[key]}</Tab>
					)}
				</div>
				<div className={cl.scroll} ref={this.tabsScroll} style={{maxHeight: this.state.viewport}}>
					{Object.keys(this.state.groups).map(key => (
						<React.Fragment key={key}>
							<h2 className="margin" ref={this.createRef(key)}>{titles[key]}</h2>
							<ul className="grid p-5">
								{this.state.groups[key].map(values => (
									<li key={values._id} className="flex flex-center" onClick={this.openIngrInfo(values)}>
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
	}
}

BurgerIngredients.propTypes = {
	list: PropTypes.arrayOf(PropTypeBurger.isRequired)
}

BurgerIngredients.defaultProps = {
	list: []
}

export default BurgerIngredients;