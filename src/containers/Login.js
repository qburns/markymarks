import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions/driveAccess';
import BookmarkCats  from './BookmarkCats';


export class Login extends Component {
    render() {
        return (
            <div>
                <h2>You're not currently logged in.</h2>
                <button onClick={this.props.loginUser}>Sign In</button>
            </div>
        )
    }
}

export default connect(null, {loginUser})(Login);
