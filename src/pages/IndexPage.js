import React from 'react';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";

const IndexPage = () => {
	return (<>
		<h1>Соберите бургер</h1>
		<div className="grid">
			<DndProvider backend={HTML5Backend}>
				<BurgerIngredients/>
				<BurgerConstructor/>
			</DndProvider>
		</div>
	</>)
};

export default IndexPage;