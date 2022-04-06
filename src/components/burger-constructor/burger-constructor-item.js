import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import {orderIngredientSwapAction} from "../../services/actions/orderActions";
import React, {useRef} from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructorItem = ({ingredient, handleClose}) => {

	const ref = useRef();
	const dispatch = useDispatch();

	const [{isDragging}, dragRef] = useDrag({
		type: 'sortable',
		item: ingredient,
		collect(monitor) {
			return {
				isDragging: monitor.isDragging()
			}
		},
	});

	const [{isDragOver}, dropRef] = useDrop({
		accept: 'sortable',
		collect(monitor) {
			return {
				isDragOver: monitor.isOver()
			}
		},
		drop(draggableItem) {
			dispatch(orderIngredientSwapAction(draggableItem, ingredient));
		}
	});

	dragRef(dropRef(ref))

	return (
		<div className={`flex flex-middle ${isDragging && 'dragging'} ${isDragOver && 'dropping'}`} ref={ref}>
			<a href="#" className="p-1"><DragIcon type="primary"/></a>
			<ConstructorElement text={ingredient.name} price={ingredient.price} thumbnail={ingredient.image}
			                    handleClose={handleClose(ingredient)}/>
		</div>
	)
};

export default BurgerConstructorItem;