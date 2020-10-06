import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from './Styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import WidgetsIcon from '@material-ui/icons/Widgets';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Tooltip from '@material-ui/core/Tooltip';
import TelegramIcon from '@material-ui/icons/Telegram';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { BrowserRouter as Router, Switch, Link, Route, Redirect } from 'react-router-dom';
import Register from '../Modules/Register';
import Login from '../Modules/Login';
import Chat from '../Modules/Chat';
import Account from '../Modules/Account';
import Reset from '../Modules/Reset';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Notification from './Notification';

export default function CenteredGrid() {
    const classes = useStyles();
    const [label, setLabel] = React.useState("REGISTER")
    const [status, setStatus] = React.useState(false);

    useEffect(() => {
        var value = localStorage.getItem("user_token")
        if (JSON.parse(value) != null) {
            setStatus(true)
            setLabel("LOGOUT")
        }
        setInterval(() => {
            call_child()
        }, 10000);
    })

    const call_child = () => {
        if (status) {
            setLabel("LOGOUT")
        }
    }

    const logout_method = () => {
        localStorage.removeItem("user_token")
        window.location.replace("http://localhost:3000")
    }
    const dynamic_method = () => {
        if (label === "LOGOUT") {
            localStorage.removeItem("user_token")
            window.location.replace("http://localhost:3000")
        }
        else if (label === "REGISTER") {
            setLabel("LOGIN")
        }
        else {
            setLabel("REGISTER")
        }
    }
    return (
        <Router className={classes.root}>
            <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                <Grid item className={classes.leftBody}>
                    <List>
                        {[1].map((i, j) =>
                            <ListItem key={j} button>
                                <MenuIcon style={{ color: "white" }} />
                            </ListItem>
                        )}
                    </List>
                    <Grid className={classes.iconStyle}>
                        <List>"
                            <Link to={status ? "/user" : "/"} style={{ textDecoration: "none" }} className={classes.title}>
                                <Tooltip title="Chat" placement="right" arrow>
                                    <ListItem button>
                                        <TelegramIcon style={{ color: "white", marginBottom: "20px" }} />
                                    </ListItem>
                                </Tooltip>
                            </Link>
                            <Link to={status ? "/account" : "/"} style={{ textDecoration: "none" }} className={classes.title}>
                                <Tooltip title="BackUp" placement="right" arrow>
                                    <ListItem button>
                                        <SettingsBackupRestoreIcon style={{ color: "white", marginBottom: "20px" }} />
                                    </ListItem>
                                </Tooltip>
                            </Link>
                            <Link to={status ? "/reset" : "/"} style={{ textDecoration: "none" }} className={classes.title}>
                                <Tooltip title="Reset" placement="right" arrow>
                                    <ListItem button>
                                        <AccountCircleIcon style={{ color: "white", marginBottom: "20px" }} />
                                    </ListItem>
                                </Tooltip>
                            </Link>
                            <Link to={status ? "/notification" : "/"} style={{ textDecoration: "none" }} className={classes.title}>
                                <Tooltip title="Notification" placement="right" arrow>
                                    <ListItem button>
                                        <NotificationsActiveIcon style={{ color: "white", marginBottom: "20px" }} />
                                    </ListItem>
                                </Tooltip>
                            </Link>
                            <Tooltip title="Logout" placement="right" arrow >
                                <ListItem button onClick={() => logout_method()}>
                                    <ExitToAppIcon style={{ color: "white", marginBottom: "20px" }} onClick={() => logout_method()} />
                                </ListItem>
                            </Tooltip>
                        </List>
                    </Grid>
                </Grid>
                <Grid item className={classes.RightBody}>
                    <div className={classes.root}>
                        <AppBar position="sticky">
                            <Toolbar variant="dense" className={classes.toolbarStyle}>
                                <Link to="/" style={{ textDecoration: "none" }} className={classes.title}>
                                    <Typography variant="h6" className={classes.title}>Chat Book</Typography>
                                </Link>
                                <Link to={label === "REGISTER" ? "/register" : "/"} style={{ textDecoration: "none" }}>
                                    <Button style={{ color: "white" }} onClick={dynamic_method} className={classes.buttonStyle}>{label}</Button>
                                </Link>
                            </Toolbar>
                        </AppBar>
                    </div>
                    <Switch>
                        <Route exact path="/" component={Login}>{status ? <Redirect to="/user" /> : <Route exact path="/" component={Login} />}</Route>
                        <Route path="/register" component={Register}>{status ? <Redirect to="/user" /> : <Route path="/register" component={Register} />}</Route>
                        <Route path="/user" component={Chat} />
                        <Route path="/account" component={Account} />
                        <Route path="/reset" component={Reset} />
                        <Route path="/notification" component={Notification} />
                    </Switch>
                </Grid>
            </Grid>
        </Router>
    );
}
