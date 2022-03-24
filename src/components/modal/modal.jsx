import React from "react";
import ReactDOM from "react-dom";
import cl from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

/**
 * Всплывающее окно
 */
class Modal extends React.Component {
	render() {
		return this.props.show && ReactDOM.createPortal((
			<div className={cl.modal}>
				<div className={cl.dialog}>
					<a href="#" className={cl.close}>
						<CloseIcon type="primary" onClick={this.props.onClose}/>
					</a>
					<h3 className={cl.header}>{this.props.title}</h3>
					<div className={cl.body}>
						{this.props.children}
					</div>
				</div>
			</div>
		), document.body);
	}
}

export default Modal;