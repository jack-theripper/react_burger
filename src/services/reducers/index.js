import {combineReducers} from "redux";
import ingredients from './ingredientsReducer';
import order from './orderReducer';
import user from './userReducer';

export default combineReducers({
	ingredients, order, user
})