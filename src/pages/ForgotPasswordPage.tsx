import React, {useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";
import cl from "./styles.module.css";
import {userResetPasswordRequestAction} from "../services/actions/userActions";
import withAuth from "../services/withAuth";
import {useDispatch} from "../services/store";

const ForgotPasswordPage: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>('');

    const forgotPasswordHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(userResetPasswordRequestAction(email, history));
    }

    return (
        <form className={cl.container} onSubmit={forgotPasswordHandler}>
            <h1 className={'text text_type_main-medium mb-6'}>
                Восстановление пароля
            </h1>
            <div className={'mb-6'}>
                <Input type={'email'} placeholder={'Укажите e-mail'} onChange={e => setEmail(e.target.value)}
                       value={email}/>
            </div>
            <div className={'mb-10'}>
                <Button type="primary" size="medium" htmlType={'submit'}>Восстановить</Button>
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

export default withAuth(ForgotPasswordPage, false);