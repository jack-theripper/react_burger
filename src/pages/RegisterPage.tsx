import React, {useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import cl from "./styles.module.css";
import {userSignUpAction} from "../services/actions/userActions";
import {useDispatch, useSelector} from "react-redux";
import withAuth from "../services/withAuth";

const RegisterPage: React.FC = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const passwordVisibleToggle = () => setPasswordVisible(state => !state);
    const registrationHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(userSignUpAction(email, password, name));
    }

    const errorMessage = useSelector<any, string | null>(state => state.user.errorMessage);

    return (
        <form className={cl.container} onSubmit={registrationHandler}>
            <h1 className={'text text_type_main-medium mb-6'}>Регистрация</h1>
            {errorMessage && <p>{errorMessage}</p>}
            <div className={'mb-6'}>
                <Input type={'text'} placeholder={'Имя'} onChange={e => setName(e.target.value)} value={name}/>
            </div>
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
                <Button type="primary" size="medium" htmlType={'submit'}>Зарегистрироваться</Button>
            </div>
            <div className={'mt-10'}>
                <p className={'text text_type_main-default'}>
                    <span>Уже зарегистрированы?</span>
                    <Link to={'/login'} className={'p-2'}>Войти</Link>
                </p>
            </div>
        </form>
    );
};

export default withAuth(RegisterPage, false);