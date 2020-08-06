import React, {Component} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Home from './Home';
import SignUp from './SignUp';
import Login from './Login';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const Menu = styled.ul`
list-style: none;
background-color: #a538ff;
color: white;
text-align: center;
margin: 0;
`;

const MenuItem = styled.li`
display: inline-block;
padding: 30px 30px;
`;



class SocialApp extends Component {
    constructor() {
        super();
        this.state = {
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
            console.log(req.data);
            
        }).catch((error) => {
            console.error(error);
        })
      
    }
    

    render() {

        return (
            <Router>
              
              <div className="App">
              <nav>
                  <Menu>
                    <MenuItem><Link to="/">Home</Link></MenuItem>

                    <MenuItem><Link to="/signup">Sign Up</Link></MenuItem>

                    <MenuItem><Link to="/login">Login</Link></MenuItem>

                    <MenuItem><button onClick={this.logOut}>Log Out</button></MenuItem>
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
                  <Login setToken={this.setSessionState} />
                </Route>

        
              </Switch> 
        
            </Router>
          );
    }
};


export default SocialApp;