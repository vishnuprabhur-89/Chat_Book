import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import API from './config';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(10, 0, 0, 0)
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    buttonStyle: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        color: "white"
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

export default function ComplexGrid() {
    const classes = useStyles();
    const [alert, setAlert] = React.useState(false);

    const backup_method = () => {
        var from = localStorage.getItem("user_token");
        Axios.post(API + "update/status", { from: JSON.parse(from).emailid })
        .then(res => {
            console.log(res.data)
            setAlert(true)
        })
    }
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={require("./images/2.webp")} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">Reset Profile API </Typography>
                                <Typography variant="body2" gutterBottom> which deletes all the messages for him but not for the receiver. </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    User ID: {JSON.parse(localStorage.getItem("user_token")).emailid}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button onClick={backup_method} fullWidth style={{ color: "white" }} className={classes.buttonStyle} variant="contained">RESET PROFILE</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid><br /><br />
                {alert ?
                    <Alert variant="filled" severity="success">
                        Your profile as been successfully reseted!
            </Alert> : <></>}
            </Paper>
        </div>
    );
}
