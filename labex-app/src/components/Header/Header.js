import React from 'react';
import { useHistory } from 'react-router-dom';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';

import { useStyles } from '../../styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function Header() {
    const classes = useStyles();
    const history = useHistory();
    const isLoggedIn = useIsLoggedIn();

    
    const goToHomePage = () => {
      history.push("/");
    }
    
    const goToLoginPage = () => {
      history.push("/login");
    }

    const handleLogout = () => {
      window.localStorage.clear();
      history.push("/login")
    }    

    const loginBtn = isLoggedIn ? 
    <Button 
      color="inherit" 
      onClick={handleLogout}> 
        logout 
    </Button> :
    <Button 
      color="inherit" 
      onClick={goToLoginPage}> 
        login
    </Button>

  return (
      <AppBar position="static" className={classes.pos}>
        <Toolbar className={classes.header}>
          <Typography 
            variant="h6" 
            className={classes.logo} 
            onClick={goToHomePage}>
              LabeX
          </Typography>
          {loginBtn}
        </Toolbar>
      </AppBar>
  );
}

export default Header;
