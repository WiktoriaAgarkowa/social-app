import React, {Component} from 'react'
import axios from 'axios';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
display: flex;

`;

const LikeButton = styled.button`
background-color: transparent;
border: none;
display: inline-block;

&:focus {
    outline: none;
}
`;

const Heart = styled(FontAwesomeIcon)`
color: #ff3b80;
font-size: 20px;
`;

const LikeValue = styled.p`
color: #1A181D;
`;


class Like extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like: 0,
            likeState: false
        }
    }

    // sendLikeToServer = () => {

    //     const headers = {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //     }

    //     axios.post('https://akademia108.pl/api/social-app/post/like',
    //                 {post_id: 40},
    //                 {'headers': headers})
    //                 .then((res)=> {

    //                     console.log("RESPONSE RECEIVED: ", res);
    //                 }).catch((error) => {
    //                     console.error(error);
    //                 })
        
    // }

    addLike = () => {

        this.setState((prevState) => {

            let likeValue = prevState.like;

        if (this.state.likeState === false) {
            likeValue += 1;
            this.setState({likeState: true})
            // this.sendLikeToServer();
        } else {
            likeValue -= 1;
            this.setState({likeState: false})
        }

        return (
            {like: likeValue}
        )

        })

        console.log(this.state.like)
    }

    render() {
        return(
            <>
                <Container>
                    <LikeValue>{this.state.like} </LikeValue>
                    <LikeButton type="submit" onClick={this.addLike}><Heart icon="heart" /></LikeButton>
                </Container>
            </>
        )
    }
}

export default Like;