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
        super(props);
        this.state = {
            signUpName: " ",
            signUpEmail: " ",
            signUpPassword: " "
        }
    }

    setData() {
        this.setState({
            signUpName: this._newNameInput.value,
            signUpEmail: this._newEmailInput.value,
            signUpPassword: this._newPasswordInput.value
        });

        console.log(this.state)
    }



    signUpMethod = () => {

        let newUser = {
          username: this._newNameInput.value,
          email: this._newEmailInput.value,
          passwor: this._newPasswordInput.value
        };
  
        const headers = {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
      
            axios.post(
                'http://akademia108.pl/api/social-app/user/signup', 
                JSON.stringify(newUser),
                { 'headers': headers })
                .then((req) => {
    
                        console.log(req.data);  

                    }).catch((error) => {
                        console.error(error);
                    });
    };

    formValidation = (e) => {
            
            e.preventDefault();

            let newNameUser = this._newNameInput.value;
            let newEmailUser = this._newEmailInput.value;
            let newPassword = this._newPasswordInput.value;
            let confirmPassword = this._confirmPasswordInput.value;

            if (newNameUser.value.trim() === '') {
                console.log('Podaj imię')
            } 

            if (newNameUser.value.length < 4) {
                console.log('Imię musi zawierać min. 4 znaki')
            }

            if (newNameUser.value.trim().includes(' ')) {
                console.log('Imię nie może posiaać spacji')
            }
            
            if (newEmailUser.value.trim() === '') {
                console.log('Podaj e-mail')
            } 
            
            if (newPassword.value.trim() === '') {
                console.log('Stwórz hasło')
            } 

            if (newPassword.value.length < 6) {
                console.log('Hasło musi zawierać min. 6 znaków')
            }
            
            if (newPassword.value.trim() !== confirmPassword.value.trim()) {
                console.log('Hasła nie są identyczne')
            } 
            
            else {
                this.signUpMethod();
            }

        }

    


    render() {
            return (
                <>
        
                <Heading>Stwórz Nowy Profil</Heading>
        
                <form onSubmit={() => this.formValidation}>

                    <Input ref={element => this._newNameInput = element} 
                    onChange={this.setData} type="text" placeholder="Imie (min. 4 znaki)*" />

                    <Input ref={element => this._newEmailInput = element} onChange={this.setData} type="email" placeholder="E-mail" />

                    <Input ref={element => this._newPasswordInput = element} onChange={this.setData} type="password" placeholder="Hasło (min. 6 znaków)*" />

                    <Input ref={element => this._confirmPasswordInput = element} type="password" placeholder="Powtórz hasło" />
                   
                    <Button type="submit">Sign Up</Button>

                </form>
                </>
             )
        }
}

export default SignUp;