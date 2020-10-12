import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    Container,
    Typography,
    makeStyles
} from '@material-ui/core';
import RegisterForm from "./RegisterForm";


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        width:'100%',
        minHeight: '100vh'
    },
    banner: {
        backgroundColor: theme.palette.background.paper,
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(2),
        borderBottom: `1px solid ${theme.palette.divider}`
    },
    bannerChip: {
        marginRight: theme.spacing(2)
    },
    methodIcon: {

        height: 30,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    },
    cardContainer: {
        display: 'flex',
        alignItems: 'center'
        // paddingBottom: 80,
        // paddingTop: 80
    },
    cardContent: {
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
    },
    currentMethodIcon: {
        height: 40,
        '& > img': {
            width: 'auto',
            maxHeight: '100%'
        }
    }
}));

const Register = ({type}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>


            <Container
                className={classes.cardContainer}
                maxWidth="sm"
            >
                <Box
                    mb={8}
                    display="flex"
                    justifyContent="center"
                >
                    {/*<RouterLink to="/">*/}
                    {/*    <Logo />*/}
                    {/*</RouterLink>*/}
                </Box>
                <Card>
                    <CardContent className={classes.cardContent}>
                        <Box
                            alignItems="center"
                            display="flex"
                            justifyContent="space-between"
                            mb={3}
                        >
                            <div>
                                <Typography
                                    color="textPrimary"
                                    gutterBottom
                                    variant="h2"
                                >
                                    Sign Up
                                    {/*{type === "register" ? "Sign up" : "Restore password"}*/}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Sign up on platform
                                    {/*{type === "register" ? "Sign up on GTOX platform" : "Enter your email address to get recovery code"}*/}
                                </Typography>
                            </div>
                        </Box>
                        <Box
                            flexGrow={1}
                            mt={3}
                        >
                            <RegisterForm/>
                        </Box>

                    </CardContent>
                </Card>
            </Container>
        </div>
    );
};

export default Register;
