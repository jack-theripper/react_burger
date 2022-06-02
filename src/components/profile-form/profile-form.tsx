import React, {useEffect, useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {shallowEqual} from "react-redux";
import {userProfileUpdateAction} from "../../services/actions/userActions";
import {Profile} from "../../types/types";
import {useDispatch, useSelector} from "../../services/store";

const ProfileForm: React.FC = () => {

	const dispatch = useDispatch();
	const profile = useSelector(({user}) => ({...user.user, password: ''}), shallowEqual);

	const [state, setState] = useState<Profile>(profile);
	const [hasChanged, setHasChanged] = useState<boolean>(false);

	useEffect(() => setState(profile), [profile]);
	useEffect(() => {
		setHasChanged(!(Object.keys(profile) as Array<keyof Profile>).every(key => profile[key] === state[key]))
	}, [state, profile]);

	const onEditField = (e: React.SyntheticEvent<HTMLInputElement>) =>
		setState({...state, [e.currentTarget.name]: e.currentTarget.value});

	const updateProfileHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(userProfileUpdateAction(state));
	}

	const cancelProfileHandler = () => setState(profile);
	const errorMessage = useSelector(state => state.user.errorMessage);

	return (
		<form onSubmit={updateProfileHandler}>
			{errorMessage && (<p>{errorMessage}</p>)}
			<div className={'mb-6'}>
				<Input type={'text'} placeholder={'Имя'} name={'name'} icon={'EditIcon'} onChange={onEditField}
				       value={state.name}/>
			</div>
			<div className={'mb-6'}>
				<Input type={'email'} placeholder={'E-mail'} name={'email'} icon={'EditIcon'} onChange={onEditField}
				       value={state.email}/>
			</div>
			<div className="mb-6">
				<Input type={'password'} placeholder={'Пароль'} name={'password'}
				       onChange={onEditField} icon={'EditIcon'} value={state.password}/>
			</div>
			{hasChanged && (<>
				<div className={'mb-10'}>
					<Button type="primary" size="medium" htmlType={'submit'}>Сохранить</Button>
				</div>
				<div className={'mb-5'}>
					<Button type="primary" size="medium" onClick={cancelProfileHandler}>Отмена</Button>
				</div>
			</>)}
		</form>
	)
};

export default ProfileForm;