import React, {Component} from 'react';
import axios from 'axios';

import {
    Container,
    Avatar,
    Name,
    Follow
} from './MyProfileStyle';


class Folowing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            folowing: []
        }
    }

    componentDidMount() {
        
        this.following();
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
        return(
            <Container>
            {this.state.folowing.map(folower => <div key={folower.id}><Avatar src={folower.avatar_url}></Avatar> <br></br>
            
            <Name>
                {folower.username}
            </Name>

            <Follow onClick={() => this.unfollow(folower.id)} onTouchStart={() => this.unfollow(folower.id)}  >Unfollow</Follow>
            </div>)}
            
            </Container>
        )
    }
}

export default Folowing;
