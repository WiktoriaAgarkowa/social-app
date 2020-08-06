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

                let newPost = res.data.map((post) => {
                    return(
                        <p>
                            {res.data.content}
                        </p>
                    )
                })
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
                
            </div>
            </>
        )
    }
}

export default Home;