import React, {Component} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Like from './Like';


const Heading = styled.h1`
text-align: center;
font-family: 'Inconsolata', monospace;
padding: 40px;
color: #1A181D;
font-weight: 500;
margin: 0;
`;

const Container = styled.div`
display: flex;
flex-wrap: wrap-reverse;
background: rgb(225,88,255);
background: linear-gradient(90deg, rgba(225,88,255,1) 0%, rgba(165,56,255,1) 68%);
border-radius: 20px;

@media (max-width: 1230px) {
    justify-content: center;
}
`;

const Ul = styled.ul`
list-style-type: none;
padding: 0 40px;
width: 80%;

@media (max-width: 1230px) {
    padding: 20px;
    width: auto;
}
`;

const Li = styled.li`
padding: 20px;
font-family: 'Inconsolata', monospace;
margin: 30px 0;
border-bottom: 1px solid #dfdae1;
background-color: #fefcff;
text-align: justify;
border-radius: 20px;
`;

const Button = styled.button`
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

const ButtonNew = styled.button`
background-color: #a538ff;
border: 0;
border-radius: 20px; 
margin-left: 40px;
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

const Recommendations = styled.div`
flex-basis: 10%;
padding: 0;

@media (max-width: 1230px) {
    flex-basis: 20%
}
`;

const UlRec = styled.ul`

list-style-type: none;
padding: 0;

@media (max-width: 1230px) {
    display: flex;
}
`;


const LiRec = styled.li`
padding: 20px;
font-family: 'Inconsolata', monospace;
text-align: justify;

`;

const Name = styled.p`
text-align: center;
font-family: 'Inconsolata', monospace;
color: #fefcff;
`;

const Follow = styled.button`
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

const Feed = styled.div`
flex-basis: 80%;
z-index: 10;

@media (max-width: 1230px) {
    flex-basis: 100%
}
`;

const Avatar = styled.img`
width: 90%;
border-radius: 20px;
display: block;
margin: auto;
`;

const Footer = styled.p`
text-align: center;
font-family: 'Inconsolata', monospace;
`;

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            feeds: [],
            filter: false,
            reccomendations: [],
            newSubscribes: []
        }
    }

    

    componentDidMount() {
        this.user = JSON.parse(localStorage.getItem('user'))
        this.getPost();
        
        if(this.user) {
            this.getRecommendations();
        } else {
            return false
        }
    }



    getPost = () => {

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        
        axios.post(
            'https://akademia108.pl/api/social-app/post/latest',
            {},
            {'headers': headers})
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res.data);

                this.setState({feeds: res.data})
           
                
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
                  
            
    }

    showMore = () => {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        
        axios.post(
            'https://akademia108.pl/api/social-app/post/latest',
            {},
            {'headers': headers})
            .then((res) => {
                // console.log("RESPONSE RECEIVED: ", res.data);

                let newPost = res.data;
                
                newPost.forEach(el => {
                    this.state.feeds.push(el)
                });

                console.log(this.state.feeds)
                
                this.setState({feeds:this.state.feeds})
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })

        
        
    }

    getPostNew = () => {

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        
        axios.post(
            'https://akademia108.pl/api/social-app/post/older-then',
            {
                date: Date.now()
            },
            {'headers': headers})
            .then((res) => {
                console.log("RESPONSE RECEIVED NEWPOST: ", res.data);

                this.setState({feeds: res.data})
                
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
                  
            
    }

    getRecommendations = () => {

        this.user = JSON.parse(localStorage.getItem('user'))

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.user.jwt_token
        }
        
        axios.post (
            'https://akademia108.pl/api/social-app/follows/recommendations',
            {},
            {'headers': headers})
            .then((res) => {
                console.log("RESPONSE RECEIVED RECOMMENDATIONS: ", res.data);

                this.setState({reccomendations: res.data})
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
                
    }

    follow = (e) => {

        this.user = JSON.parse(localStorage.getItem('user'))

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.user.jwt_token
        }
        
        axios.post (
            'https://akademia108.pl/api/social-app/follows/follow',
            {
                "leader_id": e
            },
            {'headers': headers})
            .then((res) => {
                console.log("RESPONSE RECEIVED RECOMMENDATIONS: ", res.data);
                this.getRecommendations();
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
               
    }

    


    

    render() {

        let user = JSON.parse(localStorage.getItem('user'))

        
        return (
            <>
            <Heading>Home</Heading>
    
            <Container>

                <Feed className="feed">

                    <Ul>
                        {this.state.feeds.map(post => <Li key={post.id}>{post.content}<br></br>
                       
                        <Like userToken ={this.props.token} likeValue = {post.likes.length}/>
                        </Li>)}
                    </Ul>
                    {/* <Button onClick={this.showMore}>Show More</Button>  */}
                    </Feed>

                    {user && <Recommendations className="recommendations">
                        <UlRec>{this.state.reccomendations.map(user => <LiRec key={user.id}>
                            <Avatar src={user.avatar_url}></Avatar>
                        <Name>{user.username}</Name>
                        <Follow onClick={() => this.follow(user.id)}onTouchStart={() => this.follow(user.id)}>Follow</Follow>
                        </LiRec>)}</UlRec>
                </Recommendations>}

            </Container>

            <footer><Footer>Designed by Wiktoria Agarkowa</Footer></footer>
            </>
        )
    }
}

export default Home;