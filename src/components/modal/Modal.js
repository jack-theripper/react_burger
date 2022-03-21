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
					
					<div style={{display: 'block', textAlign: 'right'}}>
						<CloseIcon type="primary" onClick={this.props.onClose}/>
					</div>
					
					{this.props.children}
				
				</div>
			</div>
		), document.body);
	}
}

export default Modal;