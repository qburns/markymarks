import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import BookmarkList from './BookmarkList';
import AddCategory from './AddCategory';
import { openCategory, clearCategory } from '../actions/interactions';
import { removeCategory } from '../actions/bookmarks';

export class BookmarkCats extends Component {


    constructor(props) {
        super(props);
    }


    bookmarkCategories() {

        let bookmarks = this.props.bookmarks;


        let titles = [];

        for (let i = 0; i < bookmarks.length; i++) {

            if (titles.indexOf(bookmarks[i].category) === -1) {
                titles.push(bookmarks[i].category);
            }

        }

        return titles.map((title) => {
            return (
              <li key={title}><a href="#" onClick={() => {this.openCat(title)}}>{title}</a>[<a href="#" onClick={() =>{this.props.removeCategory(title)}}>x</a>]</li>
            );
        })

    }

    openCat(cat) {
        this.props.openCategory(cat);
    }

    render() {

        if (this.props.opencategory) {
            return (
                <div>
                    <BookmarkList category={this.props.opencategory}/><br />
                    <a href="#" onClick={this.props.clearCategory}>Back to All Categories</a>
                </div>
            )
        }

        if (!_.isEmpty(this.props.bookmarks)) {
            return (
                <div>
                    <h3>Choose a category:</h3>
                    <ul>
                        {this.bookmarkCategories()}
                        <AddCategory />
                    </ul>
                </div>
            );
        } else {
            //no bookmarks yet
            return (
                <div>
                    <h4>You currently don't have any categories. Why not create one?</h4>
                <AddCategory />
                </div>
            );
        }

    }
}


function mapStateToProps(state) {
    return {
        bookmarks: state.markyfile.bookmarks,
        user: state.userInfo,
        opencategory: state.interactions.openCat
    };
}

export default connect(mapStateToProps, {openCategory, clearCategory, removeCategory})(BookmarkCats);


