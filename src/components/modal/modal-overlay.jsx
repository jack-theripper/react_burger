import React, {useCallback, useEffect} from "react";
import cl from "./modal.module.css";
import PropTypes from "prop-types";

/**
 * ModalOverlay — фоновая подложка под модальным окном.
 */
const ModalOverlay = ({children, closeHandler = () => null}) => {

	// 1. Клик по дочернему элементу не должен вызывать `closeHandler`
	const onClick = (event) => event.target === event.currentTarget && closeHandler();

	// 2. Закрытие по ESC должно обрабатываться в `ModalOverlay`, а в не в `Modal`.
	const onCloseByEsc = useCallback(event => event.keyCode === 27 && closeHandler(), []);

	useEffect(() => {
		document.addEventListener('keydown', onCloseByEsc);
		return () => document.removeEventListener('keydown', onCloseByEsc);
	}, []);

	return (
		<div className={cl.overlay} onClick={onClick}>
			{children}
		</div>
	);
};

ModalOverlay.propTypes = {
	closeHandler: PropTypes.func
};

export default ModalOverlay;