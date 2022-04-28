import {useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import cl from './styles.module.css';
import {useDispatch, useSelector} from "react-redux";
import {userSignInAction} from "../services/actions/userActions";

const LoginPage = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const passwordVisibleToggle = () => setPasswordVisible((state) => !state);
    const loginHandler = () => dispatch(userSignInAction(email, password));

    const loggedIn = useSelector(state => state.user.isLogged);
    const errorMessage = useSelector(state => state.user.errorMessage);

    if (loggedIn) {
        return (
            <Redirect to={'/'}/>
        )
    }

    return (
        <div className={cl.container}>
            <h1 className={'text text_type_main-medium mb-6'}>Вход</h1>
            {errorMessage && <p>{errorMessage}</p>}
            <div className={'mb-6'}>
                <Input type={'email'} placeholder={'E-mail'} onChange={e => setEmail(e.target.value)} value={email}/>
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
    )
}

export default LoginPage;