// import React from 'react'
// import { useParams } from 'react-router';
//
// const Error = () => {
//     let { status } = useParams();
//
//     return (
//         status && <h2> Ошибка {status}</h2>
//     )
// }
//
//
// export default Error;

import React, { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    Typography,
    useTheme,
    useMediaQuery,
    makeStyles, Card
} from '@material-ui/core';
import { text } from 'src/Text';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {useSelector} from 'react-redux'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(3),
        paddingTop: 80,
        paddingBottom: 80
    },
    image: {
        maxWidth: '100%',
        width: 560,
        maxHeight: 300,
        height: 'auto'
    },
    title: {
        paddingBottom: theme.spacing(4),
        letterSpacing: '6px',
        fontSize: 40
    },
    container: {
        maxWidth: 700
    },
    errorBlock: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(3),
        fontFamily: 'monospace',
        lineBreak: 'anywhere',
        color: theme.palette.text.secondary
    }
}));

const Error = () => {
    const classes = useStyles();
    const theme = useTheme();
    const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));



    const { httpErrorStatusCode, failedHttpQueryMetaData: meta } = useSelector(store => store.errorsPage);
    const copy = useRef(null);
    const [isSnackbarOpen, toggleSnackbar] = useState(false);

    const content = text[httpErrorStatusCode];

    const copyToClipboard = () => {
        /*
        * TODO: do we need handler for failed clipboard paste process???
        * */
        navigator.clipboard.writeText(copy.current.textContent);
        toggleSnackbar(true);
    };

    return (
        <div
            className={classes.root}
            title="Error"
        >
            <Container maxWidth="lg" px={4} className={classes.container}>
                <Typography
                    align="left"
                    variant={mobileDevice ? 'h4' : 'h1'}
                    color="textPrimary"
                    className={classes.title}
                >
                    {content.title.toUpperCase()}
                </Typography>
                <Typography
                    align="left"
                    variant="subtitle2"
                    color="textSecondary"
                >
                    {content.descriptionPrimary}
                </Typography>
                <Typography
                    align="left"
                    variant="subtitle2"
                    color="textSecondary"
                >
                    {content.descriptionSecondary}
                </Typography>

                {httpErrorStatusCode === 500 &&
                <Card ref={copy} className={classes.errorBlock}>
                    Data: {meta.data} <br /> Endpoint: {meta.endpoint} <br />
                    Headers: {Object.entries(meta.headers).map(([key, value]) => `${key}: ${value}`)}
                </Card>
                }

                <Box
                    mt={6}
                    display="flex"
                    justifyContent="left"
                >
                    <Button
                        color="secondary"
                        component={RouterLink}
                        to={content.buttonLink}
                        variant="outlined"
                        onClick={httpErrorStatusCode === 500 ? copyToClipboard : null}
                    >
                        {content.buttonText}
                    </Button>
                    {httpErrorStatusCode === 500 &&
                    <Button
                        style={{marginLeft: 20}}
                        color="secondary"
                        component={RouterLink}
                        to='/login'
                        variant="outlined"
                    >
                        Back
                    </Button>
                    }
                </Box>
            </Container>
            <Snackbar open={isSnackbarOpen}
                      autoHideDuration={4000}
                      onClose={() => toggleSnackbar(false)}
            >
                <Alert
                    onClose={() => toggleSnackbar(false)}
                    severity="info">
                    Text is successfully copied to your clipboard
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Error;
