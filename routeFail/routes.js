import Base from './components/Auth/Base';
import HomePage from './components/Auth/HomePage';
import SuccessAuthPageEntryPoint from './containers/Auth/SuccessAuthPageEntryPoint';
import LoginPage from './containers/Auth/LoginPage';
import SignUpPage from './containers/Auth/SignUpPage';
import Auth from './modules/Auth';

console.log('here')
const routes = {
    // base component (wrapper for the whole application).
    component: Base,
    childRoutes: [

        {
            path: '/',
            getComponent: (location, callback) => {



                if (Auth.isUserAuthenticated()) {
                    callback(null, SuccessAuthPageEntryPoint);
                } else {
                    console.log('here2')
                    callback(null, HomePage);
                }
            }
        },

        {
            path: '/login',
            component: LoginPage
        },

        {
            path: '/signup',
            component: SignUpPage
        },

        {
            path: '/logout',
            onEnter: (nextState, replace) => {
                Auth.deauthenticateUser();

                // change the current URL to /
                replace('/');
            }
        }

    ]
};

export default routes;