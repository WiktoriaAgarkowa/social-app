import React, {Component} from 'react';
import axios from 'axios';
import logo from './navigation/logo.png';
import logomin from './navigation/logo-min.png';
import Home from './feed/Home';
import SignUp from './navigation/SignUp';
import Login from './navigation/Login';
import MyProfile from './profile/MyProfile';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import {
  Menu,
  Logo,
  LogoMin,
  MenuItem,
  MenuItemLogo,
  Log,
  LinkMenu,
  LogLi,
  Welcome,
  Heading,
  Text
} from "./SocialAppStyle"


class SocialApp extends Component {
    constructor() {
        super();
        this.state = {
          login: (this.user)?true:false,
          username: '',
          email: '',
          sessionToken: '',
          start: false,
          feeds:[]
        }
    }

    componentDidMount() {

      const token = localStorage.getItem('token');
      if (!this.state.start && token && !this.state.sessionToken) {
        this.setState ({sessionToken: token});
        
          let logInUser = {
            username: 'adam',
            password: '1234',
            ttl: 3600
          };

          let headers = {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + <jwtToken />
          };

          axios.post(
            'https://akademia108.pl/api/social-app/user/login',
            JSON.stringify(logInUser),
            {'headers': headers})
            .then((req) => {
              this.setState({login: true})
              console.log(req.data)
            }).catch((error) => {
              console.error(error);
            })
          
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

    getFeeds = (obj) => {
      this.setState(prevState => {
        return({
          feeds: obj
        }); 
      });
    }

    logOut = () => {


      let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.state.sessionToken
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

    setStatus = (action) => {
      this.setState(prevState => {
        return( {
          start: action
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

                    <MenuItemLogo><LinkMenu to="/"> <Logo src={logo} className="App-logo" alt="logo" /></LinkMenu></MenuItemLogo>
                    <MenuItemLogo><LinkMenu to="/"> <LogoMin src={logomin} className="App-logo" alt="logo" /></LinkMenu></MenuItemLogo>

                    {!user && <MenuItem><LinkMenu to="/login">Log In</LinkMenu></MenuItem>}

                    {user && <MenuItem><LinkMenu to="/myprofile">My Profile</LinkMenu></MenuItem>}

                    {user && <LogLi><LinkMenu to="/" onClick={this.logOut}>Log Out</LinkMenu></LogLi>}

                    {localStorage.token === undefined && <LogLi><Log to="/signup">Sign Up</Log></LogLi>}

                  </Menu>
                  
                </nav>
                
                {!this.state.start && !user && <Welcome>
                    <Heading>Hi! Welcome to my Social App :)</Heading>
                    <Text>
                      Please <LinkMenu onClick={this.setStatus} to="/login">Log In</LinkMenu> if You already have account and <LinkMenu onClick={this.setStatus} to="/signup">Sign Up</LinkMenu> if You not :)
                    </Text>
                </Welcome>}
                
                
                </div>
              
        
                <Switch>
          
                  <Route exact path="/">
                    <Home token = {this.state.sessionToken} updateStatus={this.setStatus} getFeeds={this.getFeeds}/>
                  </Route>
          
                  <Route path="/signup">
                    {this.state.login ? <Redirect to="/" /> : <SignUp updateStatus={this.setStatus} setToken={this.setSessionState} changeLoginState={this.setLogin} />}
                  </Route>
          
                  <Route path="/login">
                  { this.state.login ? <Redirect to="/" /> : <Login updateStatus={this.setStatus} setToken={this.setSessionState} changeLoginState={this.setLogin}/>}
                  </Route>

                  <Route path="/myprofile">
                    <MyProfile objFeed = {this.state.feeds}/>
                  </Route>

          
                </Switch> 

              
        
            </Router>
          );
    }
};


export default SocialApp;
