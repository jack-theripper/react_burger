import {useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import cl from "./styles.module.css";
import {useAuth} from "../hooks/useAuth";

/**
 * /register - страница регистрации.
 */
const RegisterPage = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const passwordVisibleToggle = () => setPasswordVisible((state) => !state);

	const {signUp} = useAuth();
	
	const registrationHandler = async () => {
		try {
			await signUp(email, password, name);
			alert('ok')
		} catch (e) {
			alert('Ошибка: ' + e.toString());
		}
	}
	
	return (
		<div className={cl.container + ' flex flex-center flex-middle'}>
			<div className={cl.govnokod_privet_ot_yandex_praktikum}>
				<h1 className={'text text_type_main-medium mb-6'}>Регистрация</h1>
				<div className={'mb-6'}>
					<Input type={'text'} placeholder={'Имя'} onChange={e => setName(e.target.value)} value={name} />
				</div>
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
					<Button type="primary" size="medium" onClick={registrationHandler}>Зарегистрироваться</Button>
				</div>
				<div className={'mt-10'}>
					<p className={'text text_type_main-default'}>
						<span>Уже зарегистрированы?</span>
						<Link to={'/login'} className={'p-2'}>Войти</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;