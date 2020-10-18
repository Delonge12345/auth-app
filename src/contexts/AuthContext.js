import React, {
    createContext,
    useEffect,
    useReducer
} from 'react';
import jwtDecode from 'jwt-decode';

import {axiosInstance} from '../utils/axiosInstance';
import SplashScreen from "../components/SplashScreen";

const initialAuthState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null
};

/*
* Проверка на валидный токен
* */
const isValidToken = async (accessToken) => {
    if (!accessToken) {
        return false;
    }
    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime ? true : await refreshOutdatedToken();
};

/*
* Обновление токена, если время действия токена вышло
* */
export const refreshOutdatedToken = async () => {
    console.log("Refreshing outdated token...")
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${refreshToken}`
        const response = await axiosInstance.post('/refresh');
        const {access_token, refresh_token} = response.data;
        localStorage.setItem('accessToken', access_token);
        localStorage.setItem('refreshToken', refresh_token)
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${access_token}`
        return true
    } catch (e) {
        console.log("Обновление токенов провалилось...");
        return false;
    }
}
/*
* Устанавливаем текущую сессию
* */
const setSession = (accessToken, refreshToken) => {
    if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken')
        delete axiosInstance.defaults.headers.common.Authorization; // for all requests
    }
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'INITIALISE': {
            const {isAuthenticated, user} = action.payload;

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user
            };
        }
        case 'LOGIN': {
            const {user} = action.payload; // Достали из payload переданного пользователя и передали его в state

            return {
                ...state,
                isAuthenticated: true,
                user
            };
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null
            };
        }
        case 'REGISTER': {
            const {user} = action.payload;

            return {
                ...state,
                isAuthenticated: true,
                user
            };
        }
        default: {
            return {...state};
        }
    }
};

const AuthContext = createContext({
    ...initialAuthState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => {
    },
    register: () => Promise.resolve()
});

export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialAuthState);

    const login = async (email, password) => {
        console.log("Making response...", email, password)
        const response = await axiosInstance.post('login', {email, password});
        const {access_token, avatar, name, refresh_token, tier} = response.data;
        console.log("Response for login in in Context Provider: ", response)
        if (response.data.status === 'OK') {
            console.log("Condition works....")
            setSession(access_token, refresh_token);
            dispatch({
                type: 'LOGIN',
                payload: {
                    user: {
                        avatar, name, tier
                    }
                }
            });
            return "OK"
        }
        else
            return response.data.status
    }
    const logout = () => {
        console.log("Log out in process...")
        setSession(null);
        dispatch({type: 'LOGOUT'});
    };


    useEffect(() => {

        const initialise = async () => {
            try {
                console.log("Initializing...")
                const accessToken = localStorage.getItem('accessToken');
                if (accessToken && await isValidToken(accessToken)) {
                    const newAccessToken = localStorage.getItem('accessToken');
                    const newRefreshToken = localStorage.getItem('refreshToken');
                    setSession(newAccessToken, newRefreshToken);
                    const response = await axiosInstance.get('https://api.gtox.io/me')
                    console.log("Successfully set new session...")
                    const {avatar, name, tier} = response.data;

                    dispatch({
                        type: 'INITIALISE',
                        payload: {
                            isAuthenticated: true,
                            user: {
                                avatar, name, tier
                            }
                        }
                    });
                } else {
                    dispatch({
                        type: 'INITIALISE',
                        payload: {
                            isAuthenticated: false,
                            user: null
                        }
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: 'INITIALISE',
                    payload: {
                        isAuthenticated: false,
                        user: null
                    }
                });
            }
        };
        initialise()
    }, []);

    if (!state.isInitialised) {
        return <SplashScreen/>;
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
