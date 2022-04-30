import React, {useEffect} from 'react';
import AppHeader from "../app-header/app-header";
import {useDispatch} from "react-redux";
import {fetchIngredientsAction} from "../../services/actions/ingredientsActions";
import {BrowserRouter, Route, Switch, useHistory, useLocation} from 'react-router-dom';
import IndexPage from "../../pages/IndexPage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage";
import {fetchUserActon} from "../../services/actions/userActions";
import ProfilePage from "../../pages/ProfilePage";
import LogoutPage from "../../pages/LogoutPage";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import IngredientViewPage from "../../pages/IngredientViewPage";

const App = () => {

    const dispatch = useDispatch();

    const history = useHistory();
    const location = useLocation();
    const background = location.state && location.state.background;

    console.log(location);

    useEffect(() => {
        dispatch(fetchUserActon())
    }, []);

    useEffect(() => {
        dispatch(fetchIngredientsAction())
    }, []);

    return (<>
        <AppHeader/>
        <div className="container">
            <Switch location={background || location}>
                <Route path="/" component={IndexPage} exact/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/register" component={RegisterPage}/>
                <Route path="/forgot-password" component={ForgotPasswordPage}/>
                <Route path="/reset-password" component={ResetPasswordPage}/>
                <Route path="/profile" component={ProfilePage}/>
                <Route path="/logout" component={LogoutPage}/>
                <Route path="/ingredients/:id" component={IngredientViewPage}/>
            </Switch>
        </div>

        {background && <Route path='/ingredients/:id'>
            <Modal onClose={() => history.goBack()} title="Детали ингредиента">
                <IngredientDetails/>
            </Modal>
        </Route>}

    </>)
};

export default App;
