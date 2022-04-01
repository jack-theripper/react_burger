import React from "react";
import PropTypes from "prop-types";
import {IngredientPropType} from "../../propTypes";

const IngredientsContext = React.createContext([]);

IngredientsContext.propTypes = {
	value: PropTypes.arrayOf(IngredientPropType.isRequired).isRequired
}

export {
	IngredientsContext
};
