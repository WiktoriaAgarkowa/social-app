import styled from 'styled-components';
import {
    Link
  } from "react-router-dom";

export const Menu = styled.ul`
list-style: none;
position: relative;
display: flex;
width: 100%;
align-items: center;
background-color: #fefcff;
margin: 0;
padding: 20px 0;
`;

export const Logo = styled.img`
height: 60px;

@media (max-width: 1230px) {
  height: 30px;
}

@media (max-width: 1230px) {
  display: none;
}
`;

export const LogoMin = styled.img`
display:none;

@media (max-width: 1230px) {
  display: block;
  height: 30px;
}
`;

export const MenuItem = styled.li`
padding: 30px 30px;
`;

export const MenuItemLogo = styled.li`
padding: 0;
padding-left: 5%;
`;

export const LinkMenu = styled(Link)`
text-decoration: none;
color:white;
text-transform: uppercase;
color: #1A181D;
font-weight: 500;
`;

export const Log = styled(Link)`
text-decoration: none;
color: #1A181D;
font-weight: 500;
text-transform: uppercase;
border: 2px solid #1A181D;
padding: 10px 20px;
border-radius: 20px;
`;

export const LogLi = styled.li`
padding: 30px 30px;
flex-basis: 50%;
text-align: right;
`;

export const Welcome = styled.div`
width: 500px;
background: rgb(225,88,255);
background: linear-gradient(90deg, rgba(225,88,255,1) 0%, rgba(165,56,255,1) 68%);
position: relative;
margin: auto;
border-radius: 30px;
padding: 20px;

@media (max-width: 1230px) {
  padding: 0;
  width: 90%;
}
`;

export const Heading = styled.h1`
color: #fff;
padding: 20px;
width: 300px;
margin: auto;
text-align: center;
font-family: 'Inconsolata', monospace;
font-weight: 300;

@media (max-width: 1230px) {
  padding: 20px 0;
}
`;

export const Text = styled.p`
color: #fff;
padding: 20px;
text-align: justify;
font-family: 'Inconsolata', monospace;
font-weight: 300;

@media (max-width: 1230px) {
  padding: 10px 20px 40px 20px;
}
`;