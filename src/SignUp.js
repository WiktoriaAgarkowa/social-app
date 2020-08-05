import React, {Component}  from 'react';
import axios from 'axios';
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

class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            signUpName: "name",
            signUpEmail: "email@pl.com",
            signUpPassword: "1234@Wiktoria"
        };
    };

    test = () => {
        console.log(this.state)
        console.log (this._newNameInput.value)
    }

    createUser = (e) => {

        e.preventDefault();

        let newUser = {
            username: this._newNameInput.value,
            email: this._newEmailInput.value,
            password: this._newPasswordInput.value
        }

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        axios.post(
            'http://akademia108.pl/api/social-app/user/signup', 
            JSON.stringify(newUser),
            {'headers': headers})
            .then((req)=> {
                
                this.setState({
                    signUpName: this._newNameInput.value,
                    signUpEmail: this._newEmailInput.value,
                    signUpPassword: this._newPasswordInput.value
                })

                console.log(req.data);
            }).catch((error) => {
                console.error(error);
            })
    }
    


    render() {
            return (

                <>
        
                <Heading>Stwórz Nowy Profil</Heading>
        
                <form onSubmit={this.createUser}>

                    <Input ref={element => this._newNameInput = element} 
                    onChange={this.test}
                     type="text" placeholder="Imie (min. 4 znaki)*" />

                    <Input ref={element => this._newEmailInput = element} 
                    onChange={this.test}
                    type="email" placeholder="E-mail" />

                    <Input ref={element => this._newPasswordInput = element}
                    onChange={this.test}
                    type="password" placeholder="Hasło (min. 6 znaków)*" />

                    <Input ref={element => this._confirmPasswordInput = element} type="password" placeholder="Powtórz hasło" />
                   
                    <Button onClick={() => {this.props.addUserMethod(this.state)}} type="submit">Sign Up</Button>

                </form>
                </>
                
             )};
};

export default SignUp;