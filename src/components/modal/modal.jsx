import React from "react";
import ReactDOM from "react-dom";
import cl from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

/**
 * Всплывающее окно
 */
const Modal = ({children, show, title, onClose}) => {
	return show && ReactDOM.createPortal((
		<div className={cl.modal}>
			<div className={cl.dialog}>
				<a href="#" className={cl.close}>
					<CloseIcon type="primary" onClick={onClose}/>
				</a>
				<h3 className={cl.header}>{title}</h3>
				<div className={cl.body}>
					{children}
				</div>
			</div>
		</div>
	), document.body);
};

Modal.propTypes = {
	show: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string
}

export default Modal;