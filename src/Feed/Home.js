import React, {Component} from 'react';
import axios from 'axios';
import Like from './Like';

import {
Heading,
Container,
Ul,
Li,
User,
Recommendations,
UlRec,
LiRec,
Name,
Follow,
Feed,
Avatar,
Box,
Userbox,
Contentbox,
Footer
} from './HomeStyle'


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
        this.props.updateStatus(true)
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
                this.props.getFeeds(res.data)
                
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
                this.props.downloadFeeds(res.data)
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
               
    }



    render() {

        let user = JSON.parse(localStorage.getItem('user'))

        
        return (
            <>
            <div>
            <Heading>Home</Heading>
            </div>
    
            <Container>

                <Feed className="feed">

                    <Ul>
                        {this.state.feeds.map(post => <Li key={post.id}>
                            <Box>
                                <Userbox>
                                    <User src={post.user.avatar_url} alt="avatar"></User>
                                    {post.user.username}
                                </Userbox>

                                <Contentbox>{post.content}</Contentbox>
                            </Box>
                            <br></br>
                       
                        <Like userToken ={this.props.token} likeValue = {post.likes.length}/>
                    
                        </Li>)}
                    </Ul>

                </Feed>

                {user && <Recommendations className="recommendations">
                        <UlRec>{this.state.reccomendations.map(user => <LiRec key={user.id}>
                            <Avatar src={user.avatar_url}></Avatar>
                        <Name>{user.username}</Name>
                        <Follow onClick={() => this.follow(user.id)}>Follow</Follow>
                        </LiRec>)}</UlRec>
                </Recommendations>}

            </Container>

            <footer><Footer>Designed by Wiktoria Agarkowa</Footer></footer>
            </>
        )
    }
}

export default Home;