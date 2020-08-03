import React from 'react';
import styled from 'styled-components';

const Heading = styled.h1`
text-align: center;
`;

const SignUp = () => {
    return (
        <>

        <Heading>Sign Up For An Account</Heading>

        <form>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="E-mail" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm password" />
            <button type="submit">Sign Up</button>
        </form>
        </>
    )
}

export default SignUp;