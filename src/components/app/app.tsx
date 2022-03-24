import React, {useState} from 'react';
import './app.module.css';
import AppHeader from "../app-header";
import BurgerIngredients from '../burger-ingredients';

import data from "../../utils/data";
import BurgerConstructor from "../burger-constructor";

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
