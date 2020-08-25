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

const Button = styled.button`
background-color: #fefcff;
border: 0;
width: 70%;
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
`;

class Home extends Component {
    constructor() {
        super();

        this.state = {
            feeds: [],
            filter: false
        }
    }

    setFilter = () => {
        this.setState({filter: true})
    }

    

    componentDidMount() {
        this.user = JSON.parse(localStorage.getItem('user'))
        this.getPost();

        // if(this.state.filter === true) {
        //     this.getPostNew();
        // } else {
        //     this.getPost();
        // }
        
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
            'Accept': 'application/json' + this.user.username
        }
        
        axios.post (
            'https://akademia108.pl/api/social-app/follows/recommendations',
            {},
            {'headers': headers})
            .then((res) => {
                console.log("RESPONSE RECEIVED RECOMMENDATIONS: ", res.data);
                
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
                
    }

    

    render() {
        
        return (
            <>
            <Heading>Home</Heading>
    
            <div className="feed">

                <ButtonNew onClick={this.setFilter} >New posts</ButtonNew>
                
                <Ul>
                    {this.state.feeds.map(post => <Li key={post.id}>{post.content} <br></br>
                    
                     <Like  likeValue = {this.state.feeds.map(like => like.likes)}/>
                    </Li>)}
                </Ul>
                <Button>Show More</Button>
            </div>

            <div className="recommendations">
                <Ul></Ul>
            </div>
            </>
        )
    }
}

export default Home;