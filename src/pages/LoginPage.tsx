import React, {useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import cl from './styles.module.css';
import {useDispatch, useSelector} from "react-redux";
import {userSignInAction} from "../services/actions/userActions";
import withAuth from "../services/withAuth";

const LoginPage: React.FC = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const passwordVisibleToggle = () => setPasswordVisible((state) => !state);
    const loginHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(userSignInAction(email, password));
    }

    const errorMessage = useSelector<any, string | null>(state => state.user.errorMessage);

    return (
        <form className={cl.container} onSubmit={loginHandler}>
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
                <Button type="primary" htmlType={'submit'} size="medium">Войти</Button>
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
        </form>
    )
}

export default withAuth(LoginPage, false);