import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from './Styles';
import axios from 'axios';
import API from './config';
import Alert from '@material-ui/lab/Alert';

export default function SignIn() {
    const classes = useStyles();
    const [emailid, setEmailid] = React.useState("")
    const [password, setpassword] = React.useState("")
    const [email, helper2] = React.useState("")
    const [pass, helper3] = React.useState("")
    const [email1, helper22] = React.useState(false)
    const [pass1, helper33] = React.useState(false)
    const [alert, setAlert] = React.useState(false)
    const [alert1, setAlert1] = React.useState(false)

    const login_user = (e) => {
        e.preventDefault();
        if (!emailid.length > 0) {
            helper2("Email id should not be empty.")
            helper22(true)
        }
        if (!password.length > 0) {
            helper3("password should not be empty.")
            helper33(true)
        }
        if (emailid.length > 0 || password.length > 0) {
            axios.post(API + "signin", { emailid: emailid, password: password })
                .then(result => {
                    localStorage.setItem("user_token", JSON.stringify(result.data))
                    setAlert1(true)
                    setTimeout(() => {
                        window.location.replace("http://localhost:3000/user")
                    }, 2000);
                })
                .catch(err => {
                    setAlert(true)
                })
        }
    }

    const update_emailid = (e) => {
        setEmailid(e.target.value)
        helper2("")
        helper22(false)
        setAlert(false)
    }
    const update_password = (e) => {
        setpassword(e.target.value)
        helper3("")
        helper33(false)
        setAlert(false)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Sign in</Typography>
                <Grid className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoFocus
                        helperText={email}
                        error={email1}
                        autoComplete="email"
                        value={emailid}
                        onChange={update_emailid}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        helperText={pass}
                        error={pass1}
                        value={password}
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={update_password}
                    />
                    <Grid className={classes.GridStyle}>
                        <Link href="/user" style={{ textDecoration: "none" }} className={classes.title}>
                            <Button onClick={login_user} type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Sign In</Button>
                        </Link>
                    </Grid>
                    <Grid container style={{ marginTop: "40px" }}>
                        <Grid item>
                            <Link href="/register" variant="body2">{"Don't have an account? Sign Up"}</Link>
                        </Grid>
                    </Grid>
                </Grid>
            </div><br />
            {alert ?
                <Alert variant="filled" severity="error">
                    The Email and password mismatched!
            </Alert> : <></>}
            {alert1 ?
                <Alert variant="filled" severity="success">
                    Logged In Successfully!
            </Alert> : <></>}
        </Container>
    );
}