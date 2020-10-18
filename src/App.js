import React, {Suspense} from 'react';
import {Route, Switch} from "react-router-dom";
// import {Home} from "./components/Home";
// import {Login} from "./components/LoginView/Login";
import Drawer from "./components/Drawer";
import {makeStyles} from "@material-ui/styles";
// import Register from "./components/RegisterView/Register";
import LoadingScreen from "./components/LoadingScreen";
import AuthGuard from "./AuthGuard";
import Error from "./components/Error";

const Home = React.lazy(() => import('./components/Home'));
const Login = React.lazy(() => import('./components/LoginView/Login'));
const Register = React.lazy(() => import('./components/RegisterView/Register'));


export const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex'
    }
}))


const App = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Drawer/>
            <Switch>
                <Route exact path='/'
                       render={() =>
                           <Suspense fallback={<LoadingScreen/>}> <AuthGuard><Home/></AuthGuard> </Suspense>}
                />
                <Route exact path='/login'
                       render={() =>
                           <Suspense fallback={<LoadingScreen/>}><Login/></Suspense>}
                />
                <Route exact path='/register'
                       render={() =>
                           <Suspense fallback={<LoadingScreen/>}><Register/></Suspense>}
                />

                <Route exact path='/error/:status'
                       render={() =>
                           <Suspense fallback={<LoadingScreen/>}><Error/></Suspense>}
                />
            </Switch>
        </div>

    )
}

export default App;