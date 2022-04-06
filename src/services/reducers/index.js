import {combineReducers} from "redux";
import ingredientDetails from './ingredientDetailsReducer';
import ingredients from './ingredientsReducer';
import order from './orderReducer';

export default combineReducers({
	ingredients, ingredientDetails, order
});