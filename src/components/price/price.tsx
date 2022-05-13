import React from 'react';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./price.module.css";

interface PriceProps {
	value: number;
}

const Price: React.FC<PriceProps> = ({value}) => {
	return (
		<div className={`${cl.block} text text_type_digits-default`}>
			{value} <CurrencyIcon type="primary" />
		</div>
	);
}

export default Price;