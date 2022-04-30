import {useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory, useLocation} from "react-router-dom";
import cl from "./styles.module.css";
import {useDispatch, useSelector} from "react-redux";
import {userResetPasswordRequestAction} from "../services/actions/userActions";

const ForgotPasswordPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');

    const forgotPasswordHandler = () => dispatch(userResetPasswordRequestAction(email, history));

    return (
        <div className={cl.container}>
            <h1 className={'text text_type_main-medium mb-6'}>
                Восстановление пароля
            </h1>
            <div className={'mb-6'}>
                <Input type={'email'} placeholder={'Укажите e-mail'} onChange={e => setEmail(e.target.value)}
                       value={email}/>
            </div>
            <div className={'mb-10'}>
                <Button type="primary" size="medium" onClick={forgotPasswordHandler}>Восстановить</Button>
            </div>
            <div className={'mt-10'}>
                <p className={'text text_type_main-default'}>
                    <span>Вспомнили пароль?</span>
                    <Link to={'/login'} className={'p-2'}>Войти</Link>
                </p>
            </div>
        </div>
    )
};

export default ForgotPasswordPage;