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

class Home extends Component {
    constructor() {
        super();

        this.state = {
            feeds: []
        }
    }

    

    componentDidMount() {
        this.getPost();
    }

    getPost = () => {

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        
        axios.post(
            'https://akademia108.pl/api/social-app/post/latest',
            {'headers': headers})
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res.data);

                this.setState({feeds: res.data})
                
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
                <Ul>
                    {this.state.feeds.map(post => <Li key={post.id}>{post.content}
                    <Like />
                    </Li>)}
                </Ul>
            </div>
            </>
        )
    }
}

export default Home;