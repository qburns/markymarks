import React, { Component } from 'react';
import { connect } from 'react-redux';
import { inputtingAddName, inputtingAddURL} from '../actions/interactions';
import { createBookmark } from '../actions/bookmarks';

class AddBookmark extends Component {


    constructor(props) {
        super(props);
        this.doCreateBookmark = this.doCreateBookmark.bind(this);

        this.state = {inputtingURL: '', inputtingName: ''}
    }

    doCreateBookmark(cat, name, url) {
        this.props.createBookmark(cat, name, url);
    }

    render() {

        return (
            <div>
                <h3>Add bookmark</h3>
                <form onSubmit={(e) => {e.preventDefault(); this.doCreateBookmark(this.props.category, this.props.addName, this.props.addURL)}}>
                    <label forHtml="addName">Name:</label>
                    <input id="addName" type="text" value={this.props.addName} onChange={e => {this.props.inputtingAddName(e.target.value)} }/>

                    <label forHtml="addURL">URL:</label>
                    <input id="addURL" type="text" value={this.props.addURL} onChange={e => {this.props.inputtingAddURL(e.target.value)} }/>
                    <br />
                    <button type="submit">Add Bookmark to {this.props.category}</button>
                </form>
            </div>
        );

    }
}




function mapStateToProps(state) {
    return {
        addName: state.interactions.addBookmark.name,
        addURL: state.interactions.addBookmark.url
    };
}

export default connect(mapStateToProps, {inputtingAddName, inputtingAddURL, createBookmark})(AddBookmark);


