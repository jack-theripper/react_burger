import React from "react";
import ReactDOM from "react-dom";
import cl from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

/**
 * ModalOverlay — фоновая подложка под модальным окном.
 */
const ModalOverlay = ({children}) => {
	return (
		<div className={cl.overlay}>
			{children}
		</div>
	);
};

/**
 * Modal — компонент самого модального окна: шапка с заголовком и иконка закрытия.
 */
const Modal = ({children, show, title, onClose}) => {
	return show && ReactDOM.createPortal((
		<ModalOverlay >
			<div className={cl.dialog}>
				<a href="#" className={cl.close}>
					<CloseIcon type="primary" onClick={onClose}/>
				</a>
				<h3 className={cl.header}>{title}</h3>
				<div className={cl.body}>
					{children}
				</div>
			</div>
		</ModalOverlay>
	), document.body);
};

Modal.propTypes = {
	show: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string
}

export default Modal;