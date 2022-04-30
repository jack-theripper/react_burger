import {useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import cl from "./styles.module.css";
import {userSignUpAction} from "../services/actions/userActions";
import {useDispatch, useSelector} from "react-redux";
import withAuth from "../services/withAuth";

const RegisterPage = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const passwordVisibleToggle = () => setPasswordVisible(state => !state);
    const registrationHandler = () => dispatch(userSignUpAction(email, password, name));

    const errorMessage = useSelector(state => state.user.errorMessage);

    return (
        <div className={cl.container}>
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
                <Button type="primary" size="medium" onClick={registrationHandler}>Зарегистрироваться</Button>
            </div>
            <div className={'mt-10'}>
                <p className={'text text_type_main-default'}>
                    <span>Уже зарегистрированы?</span>
                    <Link to={'/login'} className={'p-2'}>Войти</Link>
                </p>
            </div>
        </div>
    );
};

export default withAuth(RegisterPage, false);