import React from 'react';
import { Switch, Route, IndexRoute, Redirect } from 'react-router-dom';

import App from './components/app';

import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Forgotpassword from './components/auth/forgotpassword';
import Resetpassword from './components/auth/resetpassword';
import Feature from './components/feature';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome';
import Confirmation from './components/auth/confirmation';
import Account from './components/account/account';
import EditEmail from './components/account/editemail';
import EditPassword from './components/account/editpassword';

const RoutesLib = () => {
    return (
        <Switch>
            <Route path="/" exact component={Welcome}/>
            <Route path="/signin" component={Signin} />
            <Route path="/signout" component={Signout} />
            <Route path="/signup" component={Signup} />
            <Route path="/forgotpassword" component={Forgotpassword} />
            <Route path="/resetpassword" component={Resetpassword} />
            <Route path="/confirmation" component={Confirmation} />
            <Route path="/feature" component={RequireAuth(Feature)} />
            <Route path='/account' component={RequireAuth(Account)} />
            <Route path="/editemail" component={RequireAuth(EditEmail)} />
            <Route path="/editpassword" component={RequireAuth(EditPassword)} />
        </Switch>
    )
};

export default RoutesLib;
