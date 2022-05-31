import React from 'react';
import {Route, Switch, useRouteMatch} from "react-router-dom";
import OrdersPage from "./OrdersPage";
import ProfileForm from "../components/profile-form/profile-form";
import withAuth from "../services/withAuth";
import cl from './styles.module.css';
import ProfileMenu from "../components/profile-menu/profile-menu";

const ProfilePage: React.FC = () => {
    const {path} = useRouteMatch<{ path: string }>();

    return (<>
        <div className={'grid mt-20'}>
            <Switch>
                <Route exact path={path}>
                    <div className={'width-1-4'}>
                        <ProfileMenu/>
                    </div>
                    <div className={cl.profile_container}>
                        <ProfileForm/>
                    </div>
                </Route>

                <Route path={`${path}/orders`} component={OrdersPage}/>
            </Switch>

        </div>
    </>)
};

export default withAuth(ProfilePage);