import React from "react";
import './index.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

/**
 * AppHeader — шапка приложения;
 */
class AppHeader extends React.Component {
	render() {
		return (
			<header className="header-container">
				<div className="container navbar">
					<ul className="navbar-left">
						<li className="active">
							<a href="#"><BurgerIcon type="primary"/> Конструктор</a>
						</li>
						<li>
							<a href="#"><ListIcon type="secondary"/> Лента заказов</a>
						</li>
					</ul>
					<ul className="navbar-center">
						<li>
							<Logo/>
						</li>
					</ul>
					<ul className="navbar-right">
						<li>
							<a href="#"><ProfileIcon type="secondary"/> Личный кабинет</a>
						</li>
					</ul>
				</div>
			</header>
		)
	}
}

export default AppHeader;