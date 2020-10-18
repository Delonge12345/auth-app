
import {Redirect} from 'react-router-dom';

import useAuth from "./hooks/useAuth";
import React from "react";

const AuthGuard = ({children}) => {

    const {isAuthenticated} = useAuth();
    if (!isAuthenticated) {
        return <Redirect to="/login"/>;
    }

    return (
        <>
            {children}
        </>
    );
};


export default AuthGuard;



