import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Avatar, Toolbar, Typography, IconButton, Menu, MenuItem, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import firebase from '../firebase';
import { SignOutMenuItem } from './SignIn';
import { enableNotifications, disableNotifications, ifNotificationsAreEnabled } from '../notifications';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    backgroundColor: theme.palette.primary.dark
  },
  close: {
    padding: theme.spacing(0.5),
  },
}));

class NotificationMenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.closeMenu = props.closeMenu;
    this.state = {
      notificationsEnabled: false
    }
    this.toggleNotificationState = this.toggleNotificationState.bind(this);
  }

  componentWillMount() {
    ifNotificationsAreEnabled(() => {
      this.setState({ notificationsEnabled: true });
    });
  }

  notificationMenuText() {
    return this.state.notificationsEnabled ? 'Disable notifications' : 'Enable notifications';
  }

  toggleNotificationState() {
    this.closeMenu();
    if (this.state.notificationsEnabled) {
      console.log('disabling notifications');
      disableNotifications();
    } else {
      console.log('enabling notifications');
      enableNotifications();
    }

    this.setState((prevState) => {
      return { notificationsEnabled: !(prevState.notificationsEnabled) }
    });
  }

  render() {
    return (
      <MenuItem onClick={this.toggleNotificationState}>
        {this.notificationMenuText()}
      </MenuItem>
    );
  }
}

export default function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [snacking, setSnacking] = React.useState(false);
  const open = Boolean(anchorEl);
  const email = firebase.auth().currentUser.email;

  const openMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const stopSnacking = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnacking(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" align="left" className={classes.title}>
            LCO Outbursting Objects Key (LOOK) Project
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={openMenu}
              color="inherit"
            >
              <Avatar className={classes.avatar}>{email[0].toUpperCase()}</Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={closeMenu}
            >
              <MenuItem disabled={true}>{email}</MenuItem>
              <MenuItem disabled={true}>Enable notifications</MenuItem>
              <SignOutMenuItem />
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snacking}
        autoHideDuration={6000}
        onClose={stopSnacking}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Note archived</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={stopSnacking}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
}