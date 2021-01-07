import React, {Component} from 'react';
import axios from 'axios';

import {
    Publick,
    Post,
    Delete,
    Text,
    P
} from './MyProfileStyle';


class Folowing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userpost:[]
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
            {},
            {'headers': headers})
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res.data);
  
                this.setState({userpost: res.data})

                const posts = this.state.userpost.filter(post => post.user.username === 'adam')
                this.setState({userpost: posts})

                
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
                  
            
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

                this._inputName.value = "";
                this.getPost();
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
    }

    deletePost = (id) => {
    
        this.user = JSON.parse(localStorage.getItem('user'))

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.user.jwt_token
        }
        
        axios.post (
            'https://akademia108.pl/api/social-app/post/delete',
            {
                "post_id": id
            },
            {'headers': headers})
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res.data);
                this.getPost();
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
}

    render() {
        return(
            <>
            {this.state.userpost.map(post => <Post key={post.id}><P>
                {post.content}
            </P>
            <Delete onClick={() => this.deletePost(post.id)}>Delete</Delete>
            </Post>)}

            <form onSubmit={this.addPost}>
            
            <Text ref={(element) => {this._inputName = element;}} placeholder="What's interesting You want to say?"></Text>
            <br></br>
            <Publick type="submit">Public</Publick>
            </form>

            <P>*After posting the post, other users will be able to see it on the home page</P>
            </>
        )
    }
}

export default Folowing;