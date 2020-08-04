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
padding: 10px 50px;
background-color: #659A00;
color: white;
border: 0;
border-radius: 20px; 

&:hover {
    background-color: #5FA92A;
    cursor: pointer;
}
`;

const SignUp = () => {
    return (
        <>

        <Heading>Zaloguj Się</Heading>

        <form>
            <Input type="text" placeholder="Imię" />
            <Input type="password" placeholder="Hasło" />
            <Button type="submit">Log In</Button>
        </form>
        </>
    )
}

export default SignUp;