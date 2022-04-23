import {useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import cl from "./styles.module.css";
import {useDispatch} from "react-redux";
import {userResetPasswordRequestAction} from "../services/actions/userActions";

/**
 * /forgot-password - страница восстановления пароля.
 */
const ForgotPasswordPage = () => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');

	const onClickHandler = () => {
		dispatch(userResetPasswordRequestAction(email));
	}

	return (
		<div className={cl.container + ' flex flex-center flex-middle'}>
			<div className={cl.govnokod_privet_ot_yandex_praktikum}>
				<h1 className={'text text_type_main-medium mb-6'}>
					Восстановление пароля
				</h1>
				<div className={'mb-6'}>
					<Input type={'email'} placeholder={'Укажите e-mail'} onChange={e => setEmail(e.target.value)} value={email} />
				</div>
				<div className={'mb-10'}>
					<Button type="primary" size="medium" onClick={onClickHandler}>Восстановить</Button>
				</div>
				<div className={'mt-10'}>
					<p className={'text text_type_main-default'}>
						<span>Вспомнили пароль?</span>
						<Link to={'/login'} className={'p-2'}>Войти</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default ForgotPasswordPage;