import React, {Component} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import logo from './logo.png'
import Home from './Home';
import SignUp from './SignUp';
import Login from './Login';
// import LogOut from './LogOut'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import MyProfile from './MyProfile';



const Menu = styled.ul`
list-style: none;
position: relative;
display: flex;
align-items: center;
background-color: #fefcff;
margin: 0;
`;

const Logo = styled.img`
height: 60px;



@media (max-width: 1230px) {
  height: 30px;
}
`;

const MenuItem = styled.li`
display: inline-block;
padding: 30px 30px;
`;

const LinkMenu = styled(Link)`
text-decoration: none;
color:white;
text-transform: uppercase;
color: #1A181D;
font-weight: 500;
`;

const Log = styled(Link)`
text-decoration: none;
color: #1A181D;
font-weight: 500;
text-transform: uppercase;
border: 2px solid #1A181D;
padding: 10px 20px;
border-radius: 20px;
`;



class SocialApp extends Component {
    constructor() {
        super();
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
      this.user = JSON.parse(localStorage.getItem('user'))

      let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.user.jwt_token
    };

    axios.post(
        'https://akademia108.pl/api/social-app/user/logout',
        {},
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
      let user = JSON.parse(localStorage.getItem('user'));

        return (
          
            <Router>
              
              <div className="App">
              <nav>
                  
                  <Menu>

                    <MenuItem><LinkMenu to="/"> <Logo src={logo} className="App-logo" alt="logo" /></LinkMenu></MenuItem>
                    
                    {/* <MenuItem><LinkMenu to="/">Home</LinkMenu></MenuItem> */}

                    {!user && <MenuItem><LinkMenu to="/login">Log In</LinkMenu></MenuItem>}

                    {user && <MenuItem><LinkMenu to="/myprofile">My Profile</LinkMenu></MenuItem>}

                    {user && <MenuItem><LinkMenu to="/" onClick={this.logOut}>Log Out</LinkMenu></MenuItem>}

                    {localStorage.token === undefined && <MenuItem><Log to="/signup">Sign Up</Log></MenuItem>}

                  </Menu>
                </nav>
              
              </div>
        
              <Switch>
        
                <Route exact path="/">
                  <Home token = {this.state.sessionToken}/>
                </Route>
        
                <Route path="/signup">
                  {this.state.login ? <Redirect to="/" /> : <SignUp setToken={this.setSessionState} changeLoginState={this.setLogin} />}
                </Route>
        
                <Route path="/login">
                 {this.state.login ? <Redirect to="/" /> : <Login setToken={this.setSessionState} changeLoginState={this.setLogin}/>}
                </Route>

                <Route path="/myprofile">
                  <MyProfile />
                </Route>

        
              </Switch> 
        
            </Router>
          );
    }
};


export default SocialApp;