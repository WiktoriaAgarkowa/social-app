import React from 'react';
import styled from 'styled-components';

const Heading = styled.h1`
text-align: center;
`;

const SignUp = () => {
    return (
        <>

        <Heading>Log In</Heading>

        <form>
            <input type="text" placeholder="Name" />
            <input type="password" placeholder="Password" />
            <button type="submit">Log In</button>
        </form>
        </>
    )
}

export default SignUp;