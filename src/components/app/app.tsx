import React, {useEffect, useState} from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import IngredientsService from "../../services/IngredientsService";
import {IngredientsContext, OrderContext} from "../../services/context";
// import styles from './app.module.css'; // @todo

const App = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        IngredientsService.getAll()
            .then(response => setData(response))
            .catch(error => alert(error));
    }, []);

    const [orderState, setOrderState] = useState({
        orderNumber: 0,
        list: [],
    })

    useEffect(() => {
        if (data.length > 0) {
            setOrderState({
                ...orderState,
                list: [data[0], data[5], data[4], data[7], data[8]]
            });
        }
    }, [data]);

    return (
        <div className="App">
            <AppHeader/>

            <div className="container">
                <h1>Соберите бургер</h1>
                <IngredientsContext.Provider value={data}>
                    <div className="grid">
                        <BurgerIngredients/>
                        <OrderContext.Provider value={{state: orderState, setOrderState}}>
                            <BurgerConstructor/>
                        </OrderContext.Provider>
                    </div>
                </IngredientsContext.Provider>
            </div>
        </div>
    );
};

export default App;
