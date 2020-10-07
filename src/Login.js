import React, {Component} from 'react';
import axios from 'axios';
import styled from 'styled-components';


const Heading = styled.h1`
text-align: center;
font-family: 'Inconsolata', monospace;
padding: 40px;
color: #1A181D;
font-weight: 500;
`;

const Input = styled.input`
display: block;
margin: 20px auto;
padding: 10px 40px 10px 10px;
border: 0;
border-bottom: 1px solid grey;
&:focus {
    border: 0;
    border-bottom: 1px solid grey;
    outline: 0;
}
`;

const Button = styled.button`
display: block;
margin: 0 auto;
padding: 10px 50px;
background-color: #a538ff;
color: white;
border: 0;
border-radius: 20px; 
transition: all 0.7s;
&:hover {
    background-color: #892dcf;
    cursor: pointer;
}

&:focus {
    outline: none;
`;

const Error = styled.p`
text-align: center;
color:red;
font-size: 13px;
`;

class LogIn extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: " ",
            password: " ",
            errorMsg: " "
        }
    }

    inputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }


    logInMethod = (e) => {
        e.preventDefault();

        let logInUser = {
            username: this.state.username,
            password: this.state.password,
            ttl: 3600
        }

        let headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + <jwtToken />
        };

        axios.post(
            'https://akademia108.pl/api/social-app/user/login',
            JSON.stringify(logInUser),
            {'headers': headers})
            .then((req)=> {
                
                

                if(req.data.jwt_token === undefined) {
                    this.setState(state => {
                        return({
                            errorMsg: "*Nieprawidłowe hasło lub login"
                        });
                    });
                } else {
                    this.props.setToken(req.data.jwt_token);

                    localStorage.setItem('user', JSON.stringify(req.data));

                    this.props.changeLoginState(true);

                    console.log(req.data)
                }
                
                
            }).catch((error) => {
                console.error(error);
            })


    }

    render() {
        return (
            <>
    
            <Heading>Zaloguj Się</Heading>
    
            <form onSubmit={this.logInMethod}>

                <Input onChange={this.inputChange} name="username" type="text" placeholder="Imię"/>
                <Input onChange={this.inputChange} name="password"  type="password" placeholder="Hasło"/>
                <Button type="submit">Log In</Button>
                <Error>{this.state.errorMsg}</Error>

            </form>
            </>
        )
    }
}

export default LogIn;