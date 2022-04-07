import React, {useCallback, useEffect} from "react";
import ReactDOM from "react-dom";
import cl from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ModalOverlay from './modal-overlay';

/**
 * Modal — компонент самого модального окна: шапка с заголовком и иконка закрытия.
 */
const Modal = ({children, show, title, onClose}) => {

	const onCloseByEsc = useCallback(event => {
		if (event.keyCode === 27) {
			onClose()
		}
	}, []);

	const focusHandler = useCallback(event => {
		document.activeElement.blur()
	}, []);

	useEffect(() => {

		if ( ! show) return ;

		document.addEventListener('keydown', onCloseByEsc);
		document.addEventListener('focusin', focusHandler);

		return () => {
			document.removeEventListener('keydown', onCloseByEsc);
			document.addEventListener('focusin', focusHandler);
		}
	}, [show]);

	return show && ReactDOM.createPortal(<React.Fragment>
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

	</React.Fragment>, document.getElementById('modals'));
};

Modal.propTypes = {
	show: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string
}

export default Modal;