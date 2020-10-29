import React, {Component} from 'react';
import styled from 'styled-components';
import axios from 'axios';


const Heading = styled.h1`
text-align: center;
font-family: 'Inconsolata', monospace;
padding: 40px;
color: #1A181D;
font-weight: 500;
`;

const Container = styled.div`
display: flex;
justify-content: center;
list-style-type: none;
width: 10%;
margin: auto;
`;

const Avatar = styled.img`
width:40%;
border-radius: 20px;
display: block;
margin: auto;
`;

const Name = styled.p`
font-family: 'Inconsolata', monospace;
text-align: center;
margin:0;
`;

const Follow = styled.button`
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

const Ul = styled.ul`
list-style-type: none;
padding: 0 40px;
width: 70%;
`;

const Li = styled.li`
padding: 20px;
font-family: 'Inconsolata', monospace;
margin: 30px 0;
border-bottom: 1px solid #dfdae1;
background-color: #fefcff;
text-align: justify;
`;

const ButtonNew = styled.button`
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

const Text = styled.textarea`
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

const P = styled.p`
text-align: center;
font-family: 'Inconsolata', monospace;
font-size: 14px;
`

class MyProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            folowing: []
        }
    }

    componentDidMount() {
        this.following();
        console.log(this.state.folowing)
    }

    addPost = (e) => {

        e.preventDefault();

        this.user = JSON.parse(localStorage.getItem('user'))

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.user.jwt_token
        }
        
        axios.post (
            'https://akademia108.pl/api/social-app/post/add',
            {
                "content": this._inputName.value
            },
            {'headers': headers})
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res.data);

                this.setState({posts: res.data})

                this._inputName.value = "";
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
    }

    following = () => {
        this.user = JSON.parse(localStorage.getItem('user'))

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.user.jwt_token
        }
        
        axios.post (
            'https://akademia108.pl/api/social-app/follows/allfollows',
            {
                
            },
            {'headers': headers})
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res.data);

                this.setState({folowing: res.data})
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
    }

    unfollow = (el) => {
        this.user = JSON.parse(localStorage.getItem('user'))
        console.log(this.state.folowing)
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.user.jwt_token
        }
        
        axios.post (
            'https://akademia108.pl/api/social-app/follows/disfollow',
            {
                "leader_id": el
            },
            {'headers': headers})
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res.data);

                this.following();
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
    }


    render() {

        this.user = JSON.parse(localStorage.getItem('user'))

        return (
            <>
            <Heading>Hi, {this.user.username}!</Heading>

            <Container>
            {this.state.folowing.map(folower => <div key={folower.id}><Avatar src={folower.avatar_url}></Avatar> <br></br>
            
            <Name>
                {folower.username}
            </Name>

            <Follow onClick={() => this.unfollow(folower.id)} onTouchEnd={() => this.unfollow(folower.id)}>Unfollow</Follow>
            </div>)}
            
            </Container>

            <form onSubmit={this.addPost}>
            
            <Text ref={(element) => {this._inputName = element;}} placeholder="What's interesting You want to say?"></Text>
            <br></br>
            <ButtonNew type="submit">Public</ButtonNew>
            </form>

            <P>*After posting the post, other users will be able to see it on the home page</P>
            </>
        )
    }
}

export default MyProfile;