import {useDrag, useDrop} from "react-dnd";
import {orderIngredientSwapAction} from "../../services/actions/orderActions";
import React, {useRef} from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientType} from "../../types/types";
import {AppDispatch, useDispatch} from "../../services/store";

interface BurgerConstructorItemProps {
	ingredient: IngredientType;
	handleClose: (ingredient: IngredientType) => any;
}

interface DragCollectedProps {
	isDragging: boolean;
}

interface DropCollectedProps {
	isDragOver: boolean;
}

const BurgerConstructorItem: React.FC<BurgerConstructorItemProps> = ({ingredient, handleClose = () => null}) => {

	const ref = useRef<HTMLDivElement>(null);
	const dispatch = useDispatch();

	const [{isDragging}, dragRef] = useDrag<IngredientType, unknown, DragCollectedProps>({
		type: 'sortable',
		item: ingredient,
		collect(monitor) {
			return {
				isDragging: monitor.isDragging()
			}
		},
	});

	const [{isDragOver}, dropRef] = useDrop<IngredientType, unknown, DropCollectedProps>({
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