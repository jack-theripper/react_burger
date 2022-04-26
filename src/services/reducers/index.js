import {combineReducers} from "redux";
import ingredientDetails from './ingredientDetailsReducer';
import ingredients from './ingredientsReducer';
import order from './orderReducer';
import user from './userReducer';

export default combineReducers({
	ingredients, ingredientDetails, order, user
});