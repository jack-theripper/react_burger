import React, {useEffect} from 'react';
import AppHeader from "../app-header/app-header";
import {useDispatch} from "react-redux";
import {fetchIngredientsAction} from "../../services/actions/ingredientsActions";
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import IndexPage from "../../pages/IndexPage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage";
import {userTryAuth} from "../../services/actions/userActions";
import ProfilePage from "../../pages/ProfilePage";
import LogoutPage from "../../pages/LogoutPage";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import IngredientViewPage from "../../pages/IngredientViewPage";
import AuthService from "../../services/AuthService";
import NotFoundPage from "../../pages/NotFoundPage";
import FeedPage from "../../pages/FeedPage";
import {AppDispatch, AppThunk} from "../../services/store";
import FeedOrderDetails from "../feed-order/feed-order-details";

const App: React.FC = () => {

    const dispatch = useDispatch<AppDispatch | AppThunk>();

    const history = useHistory();
    const location = useLocation<{ background?: any; }>();
    const background = location.state && location.state.background;

    useEffect(() => {
        dispatch(fetchIngredientsAction())
    }, [dispatch]);

    useEffect(() => {
        if (AuthService.getToken('token') || AuthService.getToken('refresh_token')) {
            dispatch(userTryAuth());
        }
    }, [dispatch]);

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
                <Route path="/feed" component={FeedPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>

        {background && (<Switch>
            <Route path='/ingredients/:id' render={() => (
                <Modal onClose={() => history.goBack()} title="Детали ингредиента"><IngredientDetails/></Modal>
            )}/>
            <Route path={`${background.pathname}/:id`} render={() => (
                <Modal onClose={() => history.goBack()}><FeedOrderDetails/></Modal>
            )}/>
        </Switch>)}

    </>)
};

export default App;
