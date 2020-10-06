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

export default function SignUp() {
    const classes = useStyles();
    const [userid, setUserid] = React.useState("")
    const [emailid, setEmailid] = React.useState("")
    const [password, setpassword] = React.useState("")
    const [user, helper1] = React.useState("")
    const [email, helper2] = React.useState("")
    const [pass, helper3] = React.useState("")
    const [user1, helper11] = React.useState(false)
    const [email1, helper22] = React.useState(false)
    const [pass1, helper33] = React.useState(false)
    const [alert, setAlert] = React.useState(false)
    const [alert1, setAlert1] = React.useState(false)

    const register_user = (e) => {
        e.preventDefault();
        if (!userid.length > 0) {
            helper1("User id at least 3 characters, should not be empty.")
            helper11(true)
        }
        if (!emailid.length > 0) {
            helper2("Email id at least 3 characters, should not be empty.")
            helper22(true)
        }
        if (!password.length > 0) {
            helper3("password at least 3 characters, should not be empty.")
            helper33(true)
        }
        if (userid.length > 3 || emailid.length > 3 || password.length > 3) {
            axios.post(API + "signup", { userid: userid, emailid: emailid, password: password })
                .then(result => {
                    console.log(result.data)
                    setAlert1(true)
                    setTimeout(() => {
                        window.location.replace("http://localhost:3000")
                    }, 2000);
                })
                .catch(err => {
                    console.log("err")
                    setAlert(true)
                })
        }
    }
    const update_userid = (e) => {
        setUserid(e.target.value)
        helper1("")
        helper11(false)
        setAlert(false)
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
                <Typography component="h1" variant="h5">Sign up</Typography>
                <Grid className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                helperText={user}
                                error={user1}
                                fullWidth
                                id="firstName"
                                label="User id"
                                autoFocus
                                value={userid}
                                onChange={update_userid}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                helperText={email}
                                error={email1}
                                autoComplete="email"
                                value={emailid}
                                onChange={update_emailid}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                helperText={pass}
                                error={pass1}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={update_password}
                            />
                        </Grid>
                    </Grid>
                    <Grid className={classes.GridStyle}>
                        <Link href="/user" style={{ textDecoration: "none" }} className={classes.title}>
                            <Button type="submit" fullWidth variant="contained" color="primary" onClick={register_user} className={classes.submit}>Sign Up</Button>
                        </Link>
                    </Grid>
                    <Grid container style={{ marginTop: "30px" }} justify="flex-end">
                        <Grid item>
                            <Link href="/" variant="body2">Already have an account? Sign in</Link>
                        </Grid>
                    </Grid>
                </Grid>
            </div><br />
            {alert ?
                <Alert variant="filled" severity="error">
                    The Email is already exists!
            </Alert> : <></>}
            {alert1 ?
                <Alert variant="filled" severity="success">
                    User is created!
            </Alert> : <></>}
        </Container>
    );
}