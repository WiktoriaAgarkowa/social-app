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
width: 50%;
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
    }

    addPost = () => {
        this.user = JSON.parse(localStorage.getItem('user'))

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.user.jwt_token
        }
        
        axios.post (
            'https://akademia108.pl/api/social-app/post/add',
            {
                "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et odio pellentesque diam volutpat commodo sed. Donec ac odio tempor orci dapibus. Sit amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar. Quis enim lobortis scelerisque fermentum dui faucibus in ornare quam. Etiam erat velit scelerisque in dictum. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. A condimentum vitae sapien pellentesque habitant. Pharetra magna ac placerat vestibulum lectus. Senectus et netus et malesuada fames ac turpis egestas. Iaculis nunc sed augue lacus viverra vitae congue eu. Viverra suspendisse potenti nullam ac tortor vitae purus. Eu consequat ac felis donec et odio pellentesque."
            },
            {'headers': headers})
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res.data);

                this.setState({posts: res.data})
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

                this.setState({folowing: res.data})
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
            {this.state.folowing.map(acc => <div key={acc.id}><Avatar src={acc.avatar_url}></Avatar> <br></br>
            <Name>
                {acc.username}
            </Name>

            <button>Unfollow</button>
            </div>)}
            
            </Container>

            <form onSubmit={this.addPost}>
            <Ul>
            {/* {this.state.posts.map(post => <Li key={post.id}>{post.content.map(
                function(el) {
                    el.content
                }
            )}<br></br>
            </Li>)} */}
            </Ul>
            <Text placeholder="What's interesting You want to say?"></Text>
            <br></br>
            <ButtonNew type="submit">Public</ButtonNew>
            </form>

            <P>*After posting the post, other users will be able to see it on the home page</P>
            </>
        )
    }
}

export default MyProfile;