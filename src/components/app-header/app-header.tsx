import React from "react";
import cl from './app-header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, NavLink} from "react-router-dom";

const AppHeader: React.FC = () => (
    <header className={cl.container}>
        <div className={cl.navbar + ' container'}>
            <ul>
                <li>
                    <NavLink to={'/'} activeClassName={cl.active} exact>
                        <BurgerIcon type="primary"/>
                        <span>Конструктор</span>
                    </NavLink>
                </li>
                <li>
                    <a href="#"><ListIcon type="secondary"/> Лента заказов</a>
                </li>
            </ul>
            <Link to={'/'} className={cl.center}>
                <Logo/>
            </Link>
            <ul>
                <li>
                    <NavLink to={'/profile'} activeClassName={cl.active}>
                        <ProfileIcon type="secondary"/> Личный кабинет
                    </NavLink>
                </li>
            </ul>
        </div>
    </header>
);

export default AppHeader;