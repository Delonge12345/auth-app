import React from 'react'
import {Drawer as MUIDrawer, ListItem, ListItemIcon, ListItemText, List} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles";
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {withRouter} from "react-router-dom";

export const useStyles = makeStyles((theme) => ({
    drawer: {
        width: '160px'
    }
}))

const Drawer = props => {
    const {history} = props
    const classes = useStyles();
    const itemsList = [
        {
            text: 'Home',
            icon: <HomeIcon/>,
            onClick: () => history.push('/')
        },
        {
            text: 'Login',
            icon: <AccountBoxIcon/>,
            onClick: () => history.push('/login')
        },

    ];


    return (
        <MUIDrawer variant="permanent" className={classes.drawer}>
            <List>
                {itemsList.map((item, index) => {
                    const {text} = item
                    const {icon} = item
                    const {onClick} = item

                    return (
                        <ListItem button key={text} onClick = {onClick}>
                            {icon && <ListItemIcon>{icon}</ListItemIcon>}

                            <ListItemText primary={text}/>
                        </ListItem>
                    )
                })}
            </List>
        </MUIDrawer>
    )
}

export default withRouter (Drawer) ;