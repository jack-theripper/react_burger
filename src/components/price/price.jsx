import React from 'react';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import cl from "./price.module.css";

/**
 * Компонент цены с иконкой
 */
const Price = ({value}) => {
	return (
		<div className={`${cl.block} text text_type_digits-default`}>
			{value} <CurrencyIcon type="primary" />
		</div>
	);
};

Price.propTypes = {
	value: PropTypes.number.isRequired
};

export default Price;