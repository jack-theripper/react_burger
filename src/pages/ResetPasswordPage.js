import React, {useState} from 'react';
import cl from "./styles.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {userResetPasswordConfirmationAction} from "../services/actions/userActions";

const ResetPasswordPage = () => {
	const history = useHistory();
	const location = useLocation();
	const dispatch = useDispatch();

	const [code, setCode] = useState('');
	const [password, setPassword] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);

	if (!location.state || (location.state?.from !== '/forgot-password')) {
		return <Redirect to={'/forgot-password'}/>
	}

	const passwordVisibleToggle = () => setPasswordVisible((state) => !state);
	const onResetHandler = (e) => {
		e.preventDefault();
		dispatch(userResetPasswordConfirmationAction(password, code, history));
	}

	return (
		<form className={cl.container} onSubmit={onResetHandler}>
			<h1 className={'text text_type_main-medium mb-6'}>
				Восстановление пароля
			</h1>
			<div className="mb-6">
				<Input type={passwordVisible ? 'text' : 'password'} placeholder={'Введите новый пароль'}
				       onChange={e => setPassword(e.target.value)} icon={'ShowIcon'} value={password}
				       onIconClick={passwordVisibleToggle}
				/>
			</div>
			<div className={'mb-6'}>
				<Input type={'text'} placeholder={'Введите код из письма'} onChange={e => setCode(e.target.value)}
				       value={code}/>
			</div>
			<div className={'mb-10'}>
				<Button type="primary" size="medium" htmlType={'submit'}>Сохранить</Button>
			</div>
			<div className={'mt-10'}>
				<p className={'text text_type_main-default'}>
					<span>Вспомнили пароль?</span>
					<Link to={'/login'} className={'p-2'}>Войти</Link>
				</p>
			</div>
		</form>
	)
};

export default ResetPasswordPage;