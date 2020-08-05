import React, {Component} from 'react';
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
background-color: #5DE100;
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
          newUsers: [],
          logInUsers: []
      }
    }

    addNewUser = () => {
      let newUserArray = this.state.newUsers.push('object')

      this.setState({newUsers: newUserArray})
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
                  </Menu>
                </nav>
              
              </div>
        
              <Switch>
        
                <Route exact path="/">
                  <Home />
                </Route>
        
                <Route path="/signup">
                  <SignUp />
                </Route>
        
                <Route>
                  <Login path="/login"/>
                </Route>
        
              </Switch> 
        
            </Router>
          );
    }
};


export default SocialApp;