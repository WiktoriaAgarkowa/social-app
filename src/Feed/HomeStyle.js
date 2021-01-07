import styled from 'styled-components';

export const Heading = styled.h1`
text-align: center;
font-family: 'Inconsolata', monospace;
padding: 40px;
position: relative;
color: #1A181D;
font-weight: 500;
margin: 0;
`;

export const Container = styled.div`
display: flex;
flex-wrap: wrap-reverse;
background: rgb(225,88,255);
background: linear-gradient(90deg, rgba(225,88,255,1) 0%, rgba(165,56,255,1) 68%);
border-radius: 20px;

@media (max-width: 1230px) {
    justify-content: center;
}
`;

export const Box = styled.div`
display:flex;
width: 90%;
flex-wrap: wrap;
flex-direction: row;
justify-content: space-between;
align-items: center;
text-align: center;
`;

export const Userbox = styled.div`
width: 10%;
flex-basis: 10%;
`;

export const Contentbox = styled.div`
flex-basis: 80%;
text-align: left;
`;

export const Ul = styled.ul`
list-style-type: none;
padding: 0 40px;
width: 80%;

@media (max-width: 1230px) {
    padding: 20px;
    width: auto;
}
`;

export const Li = styled.li`
padding: 20px;
font-family: 'Inconsolata', monospace;
margin: 30px 0;
border-bottom: 1px solid #dfdae1;
background-color: #fefcff;
text-align: justify;
border-radius: 20px;
`;

export const Button = styled.button`
background-color: #fefcff;
border: 0;
width: 80%;
padding: 20px 0;
margin: 0 40px 30px 40px;
font-size: 20px;
color: #1A181D; 
font-family: 'Inconsolata', monospace;

&:hover{
    cursor: pointer;
    background-color: #f2f1f2;
}

&:focus {
    outline: none;
}
`;

export const Recommendations = styled.div`
flex-basis: 10%;
padding: 0;

@media (max-width: 1230px) {
    flex-basis: 20%
}
`;

export const UlRec = styled.ul`

list-style-type: none;
padding: 0;

@media (max-width: 1230px) {
    display: flex;
}
`;


export const LiRec = styled.li`
padding: 20px;
font-family: 'Inconsolata', monospace;
text-align: justify;

`;

export const Name = styled.p`
text-align: center;
font-family: 'Inconsolata', monospace;
color: #fefcff;
`;

export const Follow = styled.button`
background-color: #fefcff;
border: 0;
border-radius: 10px; 
padding: 10px 20px;
color: #1A181D;
font-family: 'Inconsolata', monospace;
transition: all 0.35s;
display: block;
margin: auto;

&:hover {
    background-color: #892dcf;
    color:#fefcff;
    cursor: pointer;
}

&:focus {
    outline: none;
}
`;

export const Feed = styled.div`
flex-basis: 80%;


@media (max-width: 1230px) {
    flex-basis: 100%
}
`;

export const Avatar = styled.img`
width: 90%;
border-radius: 20px;
display: block;
margin: auto;
`;

export const User = styled.img`
width: 100%;
border-radius: 20px;
display: block;
margin: auto;
`;

export const Footer = styled.p`
text-align: center;
font-family: 'Inconsolata', monospace;
`;