import React, {useEffect, useState} from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import IngredientsService from "../../services/IngredientsService";
// import styles from './app.module.css'; // @todo

const App = () => {

    const [data, setData] = useState([]);

    useEffect( () => {
         IngredientsService.getAll()
             .then(response => setData(response))
             .catch(error => alert(error));
    }, []);

    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        if (data.length > 0) {
            setIngredients([data[0], data[5], data[4], data[7], data[8]]);
        }
    }, [data])

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
};

export default App;
