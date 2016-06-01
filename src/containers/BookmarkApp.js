import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, logoutUser, getFolder, searchFile, haveFile} from '../actions/driveAccess';
import BookmarkCats  from './BookmarkCats';
import ActionBar from './ActionBar';

class BookmarkApp extends Component {


    constructor(props) {
        super(props);
        window.addEventListener('google-loaded',this.props.loginUser);
    }


    render() {

            return (
                <div>
                    <BookmarkCats />
                </div>
            );

    }
}



export default connect(null, {loginUser, logoutUser, getFolder, searchFile, haveFile})(BookmarkApp);


