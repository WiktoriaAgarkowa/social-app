import React, {Component}  from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Heading = styled.h1`
text-align: center;
`;

const Input = styled.input`
display: block;
margin: 20px auto;
padding: 10px 40px 10px 10px;
border: 0;
border-bottom: 1px solid grey;
&:focus {
    border: 0;
    border-bottom: 1px solid grey;
    outline: 0;
}
`;

const Button = styled.button`
display: block;
margin: 0 auto;
padding: 10px 50px;
background-color: #a538ff;
color: white;
border: 0; 
border-radius: 20px;
transition: all 0.7s;
&:hover {
    background-color: #892dcf;
    cursor: pointer;
}
`;

class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            error: false,
            username: " ",
            email: " ",
            password: " ",
            confirm: " "
        };
    };

    inputChange = (event) => {

        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    validate = () => {

        

        if(this._newNameInput.value === ""){
            console.log("Puste pole Name")
            this.setState({error: true})
        }

        else if (this._newNameInput.value.length < 4){
            console.log("Min 4 znaki w Name")
            this.setState({error: true})
        }

        else if (this._newNameInput.value.includes(" ")){
            console.log("Białe znaki w polu Name")
            this.setState({error: true})
        }

        else if(this._newEmailInput.value === ""){
            console.log("Puste pole Email")
            this.setState({error: true})
        }

        else if (this._newPasswordInput.value.length < 6){
            console.log("Za krótkie hasło")
            this.setState({error: true})
        }

        else if (this._newPasswordInput !== this._confirmPasswordInput) {
            console.log("Hasła muszą być identyczne")
            this.setState({error: true})
        } 
        else {
             this.setState({error: false})
        }
        
    };
    

    createUser = (e) => {

        e.preventDefault();

        this.validate();

        if (this.state.error === false) {

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
                    
                    this.props.setToken(req.data.jwt_token)
    
                    console.log(req.data);
                }).catch((error) => {
                    console.error(error);
                })
        } 

       
    }
    


    render() {
            return (

                <>
        
                <Heading>Stwórz Nowy Profil</Heading>
        
                <form onSubmit={this.createUser}>

                    <Input ref={element => this._newNameInput = element} 
                    onChange={this.inputChange}
                    name="username" type="text" placeholder="Imie (min. 4 znaki)*" />

                    <Input ref={element => this._newEmailInput = element} 
                    onChange={this.inputChange}
                    name="email" type="email" placeholder="E-mail" />

                    <Input ref={element => this._newPasswordInput = element}
                    onChange={this.inputChange}
                    name="password" type="password" placeholder="Hasło (min. 6 znaków)*" />

                    <Input ref={element => this._confirmPasswordInput = element} onChange={this.inputChange} name="confirm"  type="password" placeholder="Powtórz hasło" />
                   
                    <Button type="submit">Sign Up</Button>

                </form>
                </>
                
             )};
};

export default SignUp;