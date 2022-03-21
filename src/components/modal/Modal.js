import React from "react";
import ReactDOM from "react-dom";
import './modal.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

/**
 * Всплывающее окно
 */
class Modal extends React.Component {
	render() {
		return this.props.show && ReactDOM.createPortal((
			<div className="modal">
				<div className="modal-dialog">
					<a href="#" className="modal-close">
						<CloseIcon type="primary" onClick={this.props.onClose}/>
					</a>
					<h3 className="modal-header text text_type_main-medium m-2">{this.props.title}</h3>
					<div className="modal-body">
						{this.props.children}
					</div>
				</div>
			</div>
		), document.body);
	}
}

export default Modal;