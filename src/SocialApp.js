import React, {Component} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import logo from './logo.png'
import Home from './Home';
import SignUp from './SignUp';
import Login from './Login';
import LogOut from './LogOut'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";



const Menu = styled.ul`
list-style: none;
position: relative;
background-color: #a538ff;
color: white;
text-align: center;
margin: 0;
`;

const Logo = styled.img`
height: 60px;
position: absolute;
left: 250px;
bottom: -5px;
padding: 20px
`;

const MenuItem = styled.li`
display: inline-block;
padding: 30px 30px;
`;

const LinkMenu = styled(Link)`
text-decoration: none;
color:white;
text-transform: uppercase;
`;



class SocialApp extends Component {
    constructor() {
        super();

        this.user = JSON.parse(localStorage.getItem('user'))
        this.state = {
          login: (this.user)?true:false,
          username: '',
          email: '',
          sessionToken: ''
        }
    }

    componentDidMount() {
      const token = localStorage.getItem('token');
      if (token && !this.state.sessionToken) {
        this.setState ({sessionToken: token});
      }
    }

    setSessionState = (token) => {
      localStorage.setItem('token', token);
      this.setState({sessionToken: token});
    }

    setNameState = (username) => {
      localStorage.setItem('username', username);
      this.setState({username: username});
    }

    logOut = () => {

      // this.setState({sessionToken: ''})
      // localStorage.clear();
      let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + <jwtToken />
    };

    axios.post(
        'https://akademia108.pl/api/social-app/user/logout',
        {'headers': headers})
        .then((req)=> {
            

            this.setState({sessionToken: ''})
            localStorage.clear();
            this.setLogin(false);
            console.log(req.data);

        }).catch((error) => {
            console.error(error);
        })
      
    }
    
    setLogin = (action) => {
      this.setState(prevState => {
        return({
          login: action
        }); 
      });
    }

    render() {

        return (
            <Router>
              
              <div className="App">
              <nav>
                  
                  <Menu>

                    <Logo src={logo} className="App-logo" alt="logo" />
                    <MenuItem><LinkMenu to="/">Home</LinkMenu></MenuItem>

                    <MenuItem><LinkMenu to="/signup">Sign Up</LinkMenu></MenuItem>

                    <MenuItem><LinkMenu to="/login">LogIn</LinkMenu></MenuItem>

                    <MenuItem><LinkMenu onClick={this.logOut}>LogOut</LinkMenu></MenuItem>

                  </Menu>
                </nav>
              
              </div>
        
              <Switch>
        
                <Route exact path="/">
                  <Home />
                </Route>
        
                <Route path="/signup">
                  <SignUp setToken={this.setSessionState} />
                </Route>
        
                <Route path="/login">
                 {this.state.login ? <Redirect to="/" /> : <Login setToken={this.setSessionState} />}
                </Route>

                <Route path="/login">
                  <LogOut />
                </Route>

        
              </Switch> 
        
            </Router>
          );
    }
};


export default SocialApp;