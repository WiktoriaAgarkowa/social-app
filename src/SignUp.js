import React, {Component}  from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Heading = styled.h1`
text-align: center;
font-family: 'Inconsolata', monospace;
padding: 40px;
color: #1A181D;
font-weight: 500;
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

&:focus {
    outline: none;
`;

const Error = styled.p`
color: red;
font-size: 13px;
text-align: center;
margin: 10px;
`;

class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            email: "",
            password: "",
            confirm: "",
            errMsg: ""
        };
    };

    componentDidMount() {
        this.props.updateStatus(true)
    }

    inputChange = (event) => {

        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    validate = (e) => {

        e.preventDefault();

        let newUser = {
            username: this._newNameInput.value,
            email: this._newEmailInput.value,
            password: this._newPasswordInput.value
        }

        let error = true;
        const oRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[\!\@\#\$\%])(?!.*\s).{6,}$/;
        let test = oRegExp.test(this._newPasswordInput.value)
        

        if(this._newNameInput.value === "" || this._newEmailInput.value === ""){
            error = true;
            this.setState({errMsg: "*Enter name and e-mail"})
        }

        else if (this._newNameInput.value.length < 4){
            error = true;
            this.setState({errMsg: "*The name must contain min. 4 letters"})
        }

        else if (this._newNameInput.value.includes(" ")){
            error = true;
            this.setState({errMsg: "*The first name cannot contain spaces"})
        }

        else if (this._newPasswordInput.value.length < 6){
            error = true;
            this.setState({errMsg: "*Password too short"})
        }

        else if (!test){
            error = true;
            this.setState({errMsg: "*Password must contain at least 1 number and 1 special character (!, #, @, $,%)"})
        }

        else if (this._newPasswordInput.value !== this._confirmPasswordInput.value) {
            error = true;
            this.setState({errMsg: "*The passwords do not match"})
        } 
        else {
            error = false;
        }
        
        if(error === false) {
            this.createUser(newUser);
        } else {
            console.log("Error in the form")
        }
    };
    

    createUser = (newUser) => {

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
                    // this.props.changeLoginState(true);

                    this.setState({
                        username: "",
                        email: "",
                        password: "",
                        confirm: ""
                    })
                    
    
                    console.log(req.data);
                }).catch((error) => {
                    console.error(error);
                })
       
    }
    


    render() {
            return (

                <>
        
                <Heading>Create New Profile</Heading>
        
                <form onSubmit={this.validate}>

                    <Input ref={element => this._newNameInput = element} 
                    onChange={this.inputChange}
                    value={this.state.username}
                    name="username" type="text" placeholder="Name (min. 4 signs)*" />

                    

                    <Input ref={element => this._newEmailInput = element} 
                    onChange={this.inputChange}
                    value={this.state.email}
                    name="email" type="email" placeholder="E-mail" />

                    

                    <Input ref={element => this._newPasswordInput = element}
                    onChange={this.inputChange}
                    value={this.state.password}
                    name="password" type="password" placeholder="Password (min. 6 signs)*" />

                    

                    <Input ref={element => this._confirmPasswordInput = element}
                    onChange={this.inputChange} 
                    value={this.state.confirm}
                    name="confirm"  type="password" placeholder="Repeat passwor" />
                   
                    <Button type="submit">Sign Up</Button>

                    <Error>{this.state.errMsg}</Error>

                </form>
                </>
                
             )};
};

export default SignUp;