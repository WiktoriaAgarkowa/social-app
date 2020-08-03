import React, {Component} from 'react';
import styled from 'styled-components';

const Heading = styled.h1`
text-align: center;
`;

const Input = styled.input`
display: block;
margin: 20px auto;
padding: 10px 10px;
`;

const Button = styled.button`
display: block;
margin: 0 auto;
padding: 10px;
background-color: #659A00;
color: white;
border: 0; 

&:hover {
    background-color: #5FA92A;
    cursor: pointer;
}
`;

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            email: "",
            password: ""
        }
    }

    render() {
        return (
            <>
    
            <Heading>Sign Up For An Account</Heading>
    
            <form>
                <Input type="text" placeholder="Name" />
                <Input type="email" placeholder="E-mail" />
                <Input type="password" placeholder="Password" />
                <Input type="password" placeholder="Confirm password" />
                <Button type="submit">Sign Up</Button>
            </form>
            </>
        )
    }
}

export default SignUp;