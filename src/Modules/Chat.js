import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyles from './Styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import FindReplaceIcon from '@material-ui/icons/FindReplace';
import { Container, Typography, Avatar, Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import Axios from 'axios';
import API from './config';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function FullWidthGrid() {
  const classes = useStyles();
  const [list, setList] = React.useState(!false);
  const [userlist, updateList] = React.useState([]);
  const [userlist1, updateList1] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [chatlist, setChatlist] = React.useState([]);
  const [user, setUser] = React.useState("");
  const matches = useMediaQuery('(min-width:600px)');


  //access all the user except logged in
  useEffect(() => {
    var user = localStorage.getItem("user_token")
    setUser(JSON.parse(user).emailid)
    Axios.get(API + "access")
      .then(result => {
        let arr = result.data.filter(function (e) {
          return e.emailid !== JSON.parse(user).emailid
        })
        updateList(arr)
        updateList1(arr)
      })
    setInterval(() => {
      updateChat();
    }, 9000);
  }, [])

  //filter the users in search bar
  const search_users = (e) => {
    var user = localStorage.getItem("user_token")
    var searchterm = e.target.value;
    setSearch(e.target.value)
    var list = []
    userlist1.forEach(element => {
      if (element.emailid.substring(0, searchterm.length).toLowerCase() === searchterm.toLowerCase()) {
        list.push(element)
      }
    });
    updateList(list)
    if (searchterm.length === 0) {
      Axios.get(API + "access")
        .then(result => {
          let arr = result.data.filter(function (e) {
            return e.emailid !== JSON.parse(user).emailid
          })
          updateList(arr)
        })
    }
  }
  //access previous chat messages
  const set_toUser = (value) => {
    localStorage.setItem("to_user", JSON.stringify(value))
    var user = localStorage.getItem("user_token")
    Axios.post(API + "from/and/to", { from: JSON.parse(user).emailid, to: value })
      .then(res => {
        setChatlist(res.data)
        setTimeout(() => {
          setList(!list)
        }, 100);
      })
  }
  //updating the users chats and new users.
  const updateChat = () => {
    var value = localStorage.getItem("to_user")
    var user = localStorage.getItem("user_token")
    Axios.post(API + "from/and/to", { from: JSON.parse(user).emailid, to: JSON.parse(value) })
      .then(res => {
        console.log(res.data)
        setChatlist(res.data)
      })
    Axios.get(API + "access")
      .then(result => {
        let arr = result.data.filter(function (e) {
          return e.emailid !== JSON.parse(user).emailid
        })
        updateList(arr)
        updateList1(arr)
      })
  }
  //send a message to user and update
  const sendMessage = () => {
    if (message.length > 0) {
      var user = localStorage.getItem("user_token"), to = localStorage.getItem("to_user");
      setChatlist(oldArray => [...oldArray, { from: JSON.parse(user).emailid, to: JSON.parse(to), message: message }])
      Axios.post(API + "store/chat", { from: JSON.parse(user).emailid, to: JSON.parse(to), message: message })
        .then(res => {
          setMessage("")
          Axios.post(API + "notify/update", { emailid: JSON.parse(user).emailid, from: JSON.parse(user).emailid, to: JSON.parse(to) })
            .then(res => {
              console.log(res.data)
            })
        })
    }
  }
  const call_back = () => {
    setList(!list)
    setChatlist([])
  }
  return (
    <div className={classes.root}>
      <Container className={classes.ChatWindow}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={matches ? 8 : 12}>
            {list ?
              <FormControl className={classes.InputStyle1} margin="dense" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  placeholder="eg: martin"
                  value={search}
                  onChange={search_users}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                      >
                        <FindReplaceIcon fontSize="large" style={{ color: "#FE6B8B" }} />
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl> :
              <Grid container>
                <Grid item xs={12} sm={12}>
                  <Button fullWidth style={{ color: "white" }} className={classes.buttonStyle} onClick={call_back} variant="contained">Back</Button>
                </Grid>
              </Grid>
            }
            <Paper className={classes.searchBox}>
              <Grid>
                {list ? <>
                  {userlist.map((i, j) =>
                    <Grid key={j} className={classes.chatList} onClick={() => set_toUser(i.emailid)}>
                      <Grid key={j} container direction="row" justify="flex-start" alignItems="flex-start" onClick={() => set_toUser(i.emailid)}>
                        <Avatar alt={i.emailid.substring(0, 1).toUpperCase()} src="/static/images/avatar/1.jpg" onClick={() => set_toUser(i.emailid)} />
                        <Grid direction="column" justify="center" alignItems="center" className={classes.textStyle} onClick={() => set_toUser(i.emailid)}>
                          <Typography variant="p" style={{ fontWeight: "500" }} onClick={() => set_toUser(i.emailid)}>{i.emailid.toUpperCase()}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                </>
                  : <>
                    {chatlist.map((i, j) =>
                      <>
                        <Grid key={j} container direction="row" justify={i.from !== user ? "flex-start" : "flex-end"} alignItems="center" spacing={1}>
                          <Grid container direction="row" justify={i.from !== user ? "flex-start" : "flex-end"} alignItems="center" item xs={6}>
                            <Button className={classes.buttonStyle1} variant="contained" color={i.from !== user ? "inherit" : "primary"}>{i.message}</Button>
                          </Grid>
                        </Grid>
                      </>
                    )}
                  </>
                }
              </Grid>
            </Paper>
            {list ? <></> :
              <FormControl className={classes.InputStyle1} margin="dense" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Send Msg</InputLabel>
                <OutlinedInput
                  placeholder="write a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={sendMessage}
                        edge="end"
                      >
                        <SendIcon fontSize="large" style={{ color: "#FE6B8B" }} />
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>}
          </Grid>
        </Grid>
      </Container>
    </div >
  );
}
