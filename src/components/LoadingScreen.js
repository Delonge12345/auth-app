import React, { Suspense, useEffect } from 'react';

import {
    Box,
    LinearProgress,
    makeStyles
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({

}));

const LoadingScreen = () => {
    const classes = useStyles();

    return (
        <div >
            <Box>
                <div style={{
                    height: '100%',
                    width: '100%',
                    position:'fixed',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'none'

                }}>
                    <CircularProgress /></div>
            </Box>
        </div>
    );
};

export default LoadingScreen;