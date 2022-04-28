import React, {useEffect} from 'react';
import AppHeader from "../app-header/app-header";
import {useDispatch} from "react-redux";
import {fetchIngredientsAction} from "../../services/actions/ingredientsActions";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import IndexPage from "../../pages/IndexPage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage";
import {fetchUserActon} from "../../services/actions/userActions";

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => dispatch(fetchUserActon()), [dispatch]);
    useEffect(() => dispatch(fetchIngredientsAction()), [dispatch]);

    return (
        <div className="App">
            <BrowserRouter>
                <AppHeader/>
                <div className="container">
                    <Switch>
                        <Route path="/" component={IndexPage} exact/>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/register" component={RegisterPage}/>
                        <Route path="/forgot-password" component={ForgotPasswordPage}/>
                        <Route path="/reset-password" component={ResetPasswordPage}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
