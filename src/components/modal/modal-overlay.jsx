import React, {useCallback, useEffect} from "react";
import cl from "./modal.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({closeHandler = () => null}) => {
	return (
		<div className={cl.overlay} onClick={closeHandler} />
	);
};

ModalOverlay.propTypes = {
	closeHandler: PropTypes.func
};

export default ModalOverlay;