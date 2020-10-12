import React from 'react';
import {
    makeStyles
} from '@material-ui/core';
import LoadingScreen from "./LoadingScreen";


const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: 'center',
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        left: 0,
        padding: theme.spacing(3),
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 2000
    }
}));

const SlashScreen = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <LoadingScreen/>
        </div>
    );
};

export default SlashScreen;
