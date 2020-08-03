import React from 'react';
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

const SignUp = () => {
    return (
        <>

        <Heading>Log In</Heading>

        <form>
            <Input type="text" placeholder="Name" />
            <Input type="password" placeholder="Password" />
            <Button type="submit">Log In</Button>
        </form>
        </>
    )
}

export default SignUp;