import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import {ThemeProvider} from '@material-ui/core';
import App from './App';
import theme from './theme';
import {Provider} from "react-redux";
import store from "./redux/rootReducer";
import {AuthProvider} from "./contexts/AuthContext";
import {AxiosHandler} from "./containers/AxiosHandler";

ReactDOM.render(
    <React.StrictMode>

        <ThemeProvider theme={theme}>
            <Router>
                <Provider store={store}>
                    <AuthProvider>
                        <AxiosHandler>
                            <App />
                        </AxiosHandler>
                    </AuthProvider>
                </Provider>
            </Router>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
