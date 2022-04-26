import {useCallback, useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import cl from './styles.module.css';
import {useAuth} from "../hooks/useAuth";

/**
 * /login - страница авторизации.
 */
const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const passwordVisibleToggle = () => setPasswordVisible((state) => !state);

	const {signIn} = useAuth();
	const [isAuth, setIsAuth] = useState(false);

	const loginHandler = useCallback(async () => {
		try {
			await signIn(email, password);
			setIsAuth(true);
			alert('ok')
		} catch (e) {
			alert('Ошибка: ' + e.toString());
		}
	}, [email, password]);

	if (isAuth) {
		return (
			<Redirect to={'/'} />
		);
	}

	return (
		<div className={cl.container + ' flex flex-center flex-middle'}>
			<div className={cl.govnokod_privet_ot_yandex_praktikum}>
				<h1 className={'text text_type_main-medium mb-6'}>Вход</h1>
				<div className={'mb-6'}>
					<Input type={'email'} placeholder={'E-mail'} onChange={e => setEmail(e.target.value)} value={email} />
				</div>
				<div className="mb-6">
					<Input type={passwordVisible ? 'text' : 'password'} placeholder={'Пароль'}
					       onChange={e => setPassword(e.target.value)} icon={'ShowIcon'} value={password}
					       onIconClick={passwordVisibleToggle}
					/>
				</div>
				<div className={'mb-10'}>
					<Button type="primary" size="medium" onClick={loginHandler}>Войти</Button>
				</div>
				<div className={'mt-10'}>
					<p className={'text text_type_main-default pb-2'}>
						<span>Вы — новый пользователь?</span>
						<Link to={'/register'} className={'p-2'}>Зарегистрироваться</Link>
					</p>
					<p className={'text text_type_main-default pt-2'}>
						<span>Забыли пароль?</span>
						<Link to={'/forgot-password'} className={'p-2'}>Восстановить пароль</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;