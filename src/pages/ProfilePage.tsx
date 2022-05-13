import React from 'react';
import {NavLink, Route, Switch, useRouteMatch} from "react-router-dom";
import cl from './styles.module.css';
import OrderViewPage from "./OrderViewPage";
import OrdersPage from "./OrdersPage";
import ProfileForm from "../components/profile-form/profile-form";
import withAuth from "../services/withAuth";

interface MatchParams {
	path: string
}

const ProfilePage: React.FC = () => {
	const {path} = useRouteMatch<MatchParams>();

	return (<>
		<div className={'grid mt-20'}>
			<div className={'width-1-4'}>
				<ul className={cl.navMenu}>
					<li className={'text text_type_main-default'}>
						<NavLink to={{pathname: path}} activeClassName={cl.active} exact>
							Профиль
						</NavLink>
					</li>
					<li className={'text text_type_main-default'}>
						<NavLink to={{pathname: path + '/orders'}} activeClassName={cl.active}>
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
			</div>
			<div>
				<Switch>
					<Route exact path={path} render={() => <ProfileForm/>}/>
					<Route path={`${path}/orders`} component={OrdersPage} exact/>
					<Route path={`${path}/orders/:id`} component={OrderViewPage}/>
				</Switch>
			</div>
		</div>
	</>)
};

export default withAuth(ProfilePage);