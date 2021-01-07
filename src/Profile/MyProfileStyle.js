import styled from 'styled-components';

export const Heading = styled.h1`
text-align: center;
font-family: 'Inconsolata', monospace;
padding: 40px;
color: #1A181D;
font-weight: 500;
`;

export const Container = styled.div`
display: flex;
justify-content: center;
list-style-type: none;
width: 10%;
margin: auto;
`;

export const Avatar = styled.img`
width:40%;
border-radius: 20px;
display: block;
margin: auto;
`;

export const Name = styled.p`
font-family: 'Inconsolata', monospace;
text-align: center;
margin:0;
`;

export const Follow = styled.button`
background-color: #fefcff;
border: 0;
border-bottom: 1px solid #dfdae1;
border-radius: 10px; 
padding: 10px 20px;
color: #1A181D;
font-family: 'Inconsolata', monospace;
transition: all 0.35s;
display: block;
margin: auto;
margin-top: 20px;

&:hover {
    background-color: #892dcf;
    color:#fefcff;
    cursor: pointer;
}

&:focus {
    outline: none;
}
`;

export const Publick = styled.button`
background-color: #a538ff;
border: 0;
border-radius: 20px; 
margin-top: 40px;
display:block;
margin: auto;
padding: 10px;
color: #fff;
font-family: 'Inconsolata', monospace;
transition: all 0.7s;

&:hover {
    background-color: #892dcf;
    cursor: pointer;
}

&:focus {
    outline: none;
}
`;

export const Post = styled.div`
width: 80%;
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
background-color: #feffff;
text-align: center;
margin: auto;
margin-top: 40px;
border: 1px solid #eeeeee;
`;

export const Delete = styled.button`
flex-basis: 10%;
border: 0;
border-radius: 15px;
height: 30px;
font-family: 'Inconsolata', monospace;
transition: all 0.2s;

&:hover {
    background-color: #892dcf;
    color: #fff;
    cursor: pointer;
}

&:focus {
    outline: none;
}
`;

export const Text = styled.textarea`
width: 80%;
padding-bottom: 150px;
background-color: #fefcff;
border: none;
display:block;
margin: auto;
margin-top: 50px;
border-bottom: 1px solid #dfdae1;

&:focus {
    outline: none;
}
`;

export const P = styled.p`
text-align: center;
flex-basis: 60%;
font-family: 'Inconsolata', monospace;
font-size: 14px;
`
