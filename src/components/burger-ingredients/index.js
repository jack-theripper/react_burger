import React from "react";
import {Tab, Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import PropTypeBurger from '../../utils/type-burger';
import './index.css';

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
			viewport: 'calc(100vh - 250px)'
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

	render() {
		return (
			<React.Fragment>
				<div className="tabs">
					{Object.keys(this.state.groups).map(key =>
						<Tab value={key} key={key} active={this.state.activeTab === key}
						     onClick={this.changeTab}>{key}</Tab>
					)}
				</div>
				<div className="tabs-scroll" ref={this.tabsScroll} style={{maxHeight: this.state.viewport}}>
					{Object.keys(this.state.groups).map(key => (
						<React.Fragment key={key}>
							<h2 className="margin" ref={this.createRef(key)}>{key}</h2>
							<ul className="grid">
								{this.state.groups[key].map(values => (
									<li key={values._id} className="relative">
										<img src={values.image} alt={values.name} />
										<Counter count={1} size="default" />
										<p className="text text_type_digits-medium">{values.price} <CurrencyIcon type="primary"/></p>
										{values.name}
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