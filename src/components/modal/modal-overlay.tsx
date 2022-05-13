import React from "react";
import cl from "./modal.module.css";

interface ModalOverlayProps {
	closeHandler?: () => void
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({closeHandler = () => null}) => {
	return (
		<div className={cl.overlay} onClick={closeHandler} />
	);
};

export default ModalOverlay;