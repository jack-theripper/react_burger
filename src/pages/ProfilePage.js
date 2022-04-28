import React from 'react';
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";
import cl from './styles.module.css';

const ProfilePage = () => {
    const dispatch = useDispatch();

    return (
        <div className={''}>
            <h1>Профиль</h1>
            <div className={'grid'}>

                <div>123</div>
                <div>434</div>

            </div>
        </div>
    );
};

export default ProfilePage;