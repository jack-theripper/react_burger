import React from 'react';
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import cl from "./styles.module.css";

const IngredientViewPage = () => {
	return (<div className={cl.container}>
		<h3 className="text text text_type_main-large mt-30">Детали ингредиента</h3>
		<IngredientDetails />
	</div>);
};

export default IngredientViewPage;