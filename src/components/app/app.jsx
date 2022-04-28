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
import ProfilePage from "../../pages/ProfilePage";
import LogoutPage from "../../pages/LogoutPage";

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserActon())
    }, []);

    useEffect(() => {
        dispatch(fetchIngredientsAction())
    }, []);

    return (
        <BrowserRouter>
            <AppHeader/>
            <div className="container">
                <Switch>
                    <Route path="/" component={IndexPage} exact/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/register" component={RegisterPage}/>
                    <Route path="/forgot-password" component={ForgotPasswordPage}/>
                    <Route path="/reset-password" component={ResetPasswordPage}/>
                    <Route path="/profile" component={ProfilePage}/>
                    <Route path="/logout" component={LogoutPage}/>
                </Switch>
            </div>
        </BrowserRouter>
    )
};

export default App;
