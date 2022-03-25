import PropTypes from "prop-types";

export const OrderPropType = PropTypes.shape({
	id: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired,
});

export default PropTypes.shape({
	_id: PropTypes.string,
	name: PropTypes.string,
	price: PropTypes.number,
	type: PropTypes.string,
	image: PropTypes.string,

});
