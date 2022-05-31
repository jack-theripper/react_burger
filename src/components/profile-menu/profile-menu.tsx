import React from 'react';
import cl from "../../pages/styles.module.css";
import {NavLink, useRouteMatch} from "react-router-dom";

const ProfileMenu = () => {
    return (<div>
        <ul className={cl.navMenu}>
            <li className={'text text_type_main-default'}>
                <NavLink to={{pathname: '/profile'}} activeClassName={cl.active} exact>
                    Профиль
                </NavLink>
            </li>
            <li className={'text text_type_main-default'}>
                <NavLink to={{pathname: '/profile/orders'}} activeClassName={cl.active}>
                    История заказов
                </NavLink>
            </li>
            <li className={'text text_type_main-default'}>
                <NavLink to={{pathname: '/logout'}}>
                    Выход
                </NavLink>
            </li>
        </ul>
        <p className={'text text_type_main-default text_color_inactive mt-20'}>
            В этом разделе вы можете
            изменить свои персональные данные
        </p>
    </div>);
};

export default ProfileMenu;