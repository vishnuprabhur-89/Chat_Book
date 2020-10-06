import { makeStyles } from '@material-ui/core/styles';
import { useWindowHeight } from '@react-hook/window-size';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        cursor: "pointer",
        color: "grey",
        fontFamily: "timesnewroman"
    },
    buttonStyle: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        color: "white"
    },
    leftBody: {
        width: "4.5%",
        height: useWindowHeight(),
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        [theme.breakpoints.down(1050)]: {
            width: "8%",
            height: useWindowHeight(),
        },
        [theme.breakpoints.down(650)]: {
            width: "14%",
            height: useWindowHeight(),
        },
    },
    RightBody: {
        width: "95.5%",
        height: useWindowHeight(),
        [theme.breakpoints.down(1050)]: {
            width: "92%",
            height: useWindowHeight(),
        },
        [theme.breakpoints.down(650)]: {
            width: "86%",
            height: useWindowHeight(),
        },
    },
    toolbarStyle: {
        backgroundColor: "white",
        color: "black"
    },
    iconStyle: {
        marginTop: theme.spacing(10)
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(5),
        '& label.Mui-focused': {
            color: 'grey',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'grey',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'grey',
            },
            '&:hover fieldset': {
                borderColor: 'grey',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'grey',
            },
        },
    },

    submit: {
        margin: theme.spacing(3, 0, 2),
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        color: "white"
    },
    GridStyle: {
        marginTop: "20px"
    },
    ChatWindow: {
        margin: theme.spacing(5, 0, 0, 0)
    },
    searchBox: {
        padding: theme.spacing(2),
        height: "400px",
        overflowY: "scroll",
    },
    InputStyle1: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(5),
        '& label.Mui-focused': {
            color: 'grey',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'black',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'grey',
            },
            '&:hover fieldset': {
                borderColor: 'black',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'black',
            },
        },
    },
    Design: {
        padding: theme.spacing(2),
        cursor: "pointer",
        backgroundColor: "white",
        "&:hover": {
            backgroundColor: "#f5f5f5"
        }
    },
    textStyle: {
        marginLeft: theme.spacing(5),
        [theme.breakpoints.down(650)]: {
            marginLeft: theme.spacing(3),
            fontSize:"4vmin"
        }
    },
    buttonStyle1: {
        color: "white",
        backgroundColor: "#7cb342",
        margin: theme.spacing(1),
        textAlign: "left"
    },
    chatList: {
        padding: theme.spacing(2),
        margin: "2px",
        cursor: "pointer",
        backgroundColor: "white",
        "&:hover": {
            backgroundColor: "#eeeeee",
            borderRadius: "10px"
        },
        [theme.breakpoints.down(650)]: {
            padding: theme.spacing(2),
            margin: "1px",
        }
    }
}));

export default useStyles;