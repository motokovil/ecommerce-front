import React from 'react'
import './App.css';
import {

  BrowserRouter as Router,
  Link,
  Switch,
  Route
  
} from 'react-router-dom'
import Home from './layout/home'
import Login from './layout/login'
import About from './layout/about'

//MATERIAL UI NAVBAR
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from './themeConfig'

//MATERIAL UI
const useStyles = makeStyles((theme) => ({
  Button:{
    textDecoration: 'none',
    marginRight: '5px'
  },
  title: {
    flexGrow: 1
  }
}));

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Router>

        <Box 
          p={2} 
          display='flex'
          alignItems='center'
        >
          <IconButton edge="start" color="primary" aria-label="menu">
              <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
              Home
          </Typography>
          <Link to="/" className={classes.Button}>
            <Button variant='outlined' color="primary" size='small'>Home</Button>
          </Link>
          <Link to="/Login" className={classes.Button}>
            <Button variant='outlined' color="primary" size='small'>Login</Button>
          </Link>
          <Link to="/About" className={classes.Button}>
            <Button variant='outlined' color="primary" size='small'>About</Button>
          </Link>
        </Box>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/About">
            <About />
          </Route>
        </Switch>

    </Router>
    </ThemeProvider>
  );
}

export default App;
