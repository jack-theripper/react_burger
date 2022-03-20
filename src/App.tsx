import React from 'react';
import './App.css';
import AppHeader from "./components/app-header";
import BurgerIngredients from './components/burger-ingredients';

import data from "./utils/data";

function App() {

    return (
        <div className="App">
            <AppHeader />

            <div className="container">
                <h1>Соберите бургер</h1>
                <div className="grid">
                    <div>
                        <BurgerIngredients list={data}/>
                    </div>
                    <div>
                        <div style={{background: "red"}}>
                            pff
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
