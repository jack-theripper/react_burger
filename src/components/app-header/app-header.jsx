import React from "react";
import cl from './app-header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

const AppHeader = () => {
	return (
		<header className={cl.container}>
			<div className={cl.navbar + ' container'}>
				<ul>
					<li className={cl.active}>
						<Link to={'/'}>
							<BurgerIcon type="primary"/>
							<span>Конструктор</span>
						</Link>
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
						<Link to={'/profile'}>
							<ProfileIcon type="secondary"/> Личный кабинет
						</Link>
					</li>
				</ul>
			</div>
		</header>
	)
};

export default AppHeader;