import React from "react";
import cl from './app-header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

/**
 * AppHeader — шапка приложения;
 */
class AppHeader extends React.Component {
	render() {
		return (
			<header className={cl.container}>
				<div className={cl.navbar + ' container'}>
					<ul>
						<li className={cl.active}>
							<a href="#">
								<BurgerIcon type="primary"/>
								<span>Конструктор</span>
							</a>
						</li>
						<li>
							<a href="#"><ListIcon type="secondary"/> Лента заказов</a>
						</li>
					</ul>
					<div className={cl.center}>
						<Logo/>
					</div>
					<ul>
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