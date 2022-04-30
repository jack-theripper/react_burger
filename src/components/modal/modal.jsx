import React, {useCallback, useEffect} from "react";
import ReactDOM from "react-dom";
import cl from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ModalOverlay from './modal-overlay';

const Modal = ({children, title, onClose}) => {
	const onCloseByEsc = useCallback(event => {
		if (event.keyCode === 27) {
			onClose()
		}
	}, []);

	useEffect(() => {
		document.addEventListener('keydown', onCloseByEsc);

		return () => document.removeEventListener('keydown', onCloseByEsc);
	}, []);

	return ReactDOM.createPortal(<>
		<ModalOverlay closeHandler={onClose}/>
		<div tabIndex="-1" className={cl.dialog}>
			<a href="#" className={cl.close}>
				<CloseIcon type="primary" onClick={onClose}/>
			</a>
			<h3 className={cl.header}>{title}</h3>
			<div className={cl.body}>
				{children}
			</div>
		</div>
	</>, document.getElementById('modals'));
};

Modal.propTypes = {
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string
}

export default Modal;