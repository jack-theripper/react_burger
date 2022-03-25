import PropTypes from "prop-types";

export const IngredientPropType = PropTypes.shape({
	_id: PropTypes.string,
	name: PropTypes.string,
	type: PropTypes.string,
	proteins: PropTypes.number,
	fat: PropTypes.number,
	carbohydrates: PropTypes.number,
	calories: PropTypes.number,
	price: PropTypes.number,
	image: PropTypes.string,
	image_mobile: PropTypes.string,
	image_large: PropTypes.string
});

export const OrderPropType = PropTypes.shape({
	id: PropTypes.string,
	status: PropTypes.string,
});