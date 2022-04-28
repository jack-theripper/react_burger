import React, {useMemo, useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {userProfileUpdateAction} from "../../services/actions/userActions";

const ProfileForm = () => {

	const dispatch = useDispatch();

	const profile = useSelector(state => ({...state.user.user, password: ''}));
	const [state, setState] = useState(profile);

	const hasChanged = useMemo(() => {
		const keys = Object.keys(profile);

		for (let key of keys) {
			if (profile[key] !== state[key]) {
				return true;
			}
		}

		return false;
	}, [state, profile])

	const onEditField = (e) => setState({...state, [e.currentTarget.name]: e.currentTarget.value})

	const updateProfileHandler = () => dispatch(userProfileUpdateAction(state));
	const cancelProfileHandler = () => setState(profile);

	const errorMessage = useSelector(state => state.user.errorMessage);

	return (
		<>
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
					<Button type="primary" size="medium" onClick={updateProfileHandler}>Сохранить</Button>
				</div>
				<div className={'mb-5'}>
					<Button type="primary" size="medium" onClick={cancelProfileHandler}>Отмена</Button>
				</div>
			</>)}
		</>
	)
};

export default ProfileForm;