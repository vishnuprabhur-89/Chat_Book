import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import API from './config';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    body: {
        width: "50%",
        margin: "auto",
    },
    body1: {
        margin: theme.spacing(5, 0, 0, 0),
    },
    body2: {
        margin: theme.spacing(2)
    }
}));

export default function CenteredGrid() {
    const classes = useStyles();
    const [notification, setNotigy] = React.useState([]);

    useEffect(() => {
        var user = localStorage.getItem("user_token")
        Axios.get(API + `access/notify/${JSON.parse(user).emailid}`)
            .then(res => {
                setNotigy(res.data)
            })
    }, [])
    return (
        <div className={classes.root}>
            <Grid container className={classes.body}>
                <Grid item xs={12} className={classes.body1}>
                    {notification.map((i, j) => 
                    <Alert key={j} className={classes.body2} variant="filled" severity="success">{i.to.toUpperCase()}&nbsp;sent message to you&nbsp;&nbsp;&nbsp;{i.createdAt}</Alert>)}
                </Grid>
            </Grid>
        </div>
    );
}

