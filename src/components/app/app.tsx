import React, {useState} from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
// import styles from './app.module.css'; // @todo

import data from "../../utils/data";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {

    const [ingredients, setIngredients] = useState([
        data[0], data[5], data[4], data[7], data[8],
        // data[0], data[5], data[4], data[7], data[8],
    ]);

    return (
        <div className="App">
            <AppHeader/>

            <div className="container">
                <h1>Соберите бургер</h1>
                <div className="grid">
                    <div>
                        <BurgerIngredients list={data}/>
                    </div>
                    <div>
                        <BurgerConstructor ingredients={ingredients}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
