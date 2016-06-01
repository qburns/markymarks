import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as constants from '../constants/AppConstants';
import AddBookmark from './AddBookmark';
import { removeBookmark } from '../actions/bookmarks';

export class BookmarkList extends Component {

    constructor(props) {
        super(props);
    }

    displayList() {

     var items = this.props.bookmarks.filter(bookmarks => bookmarks.category === this.props.category);


        //When initially creating categories, we place an empty, hidden bookmark as a placeholder in the store.
        //Here we check if we have actual bookmarks in this cat, not a placeholder
        if(items.length >= 1 && items[0].name !== constants.hiddenItemOnCategoryCreation) {

            return items.map((bookmark, i) => {

                let searchTerm = bookmark.id;
                let visibility;

                let catName = this.props.category;
                let itemName = bookmark.name;
                let itemURL = bookmark.url;
                let itemId = bookmark.id;

                if (i > 0) {
                    catName = '';
                }

                if(bookmark.name === constants.hiddenItemOnCategoryCreation && bookmark.url === constants.hiddenItemOnCategoryCreation ) {
                    visibility = 'hidden';
                }
                    return (
                        <div>
                            {this.displayCat(catName)}
                            <li className={visibility} key={itemId}>
                                <a href={itemURL} target="_blank">{itemName}</a> [<a href="#"
                                                                                     onClick={() => this.props.removeBookmark(itemId)}>x</a>]
                            </li>
                        </div>
                    )
            });
        } else {
            return (
                <div>
                    {this.displayCat(this.props.category)}
                    <p>You don't have any bookmarks in this category.</p>
                </div>
            );
        }

    }

    displayCat(title) {
        if (title) {
            return <h3>{title}</h3>
        }
    }


    render() {

        if(this.props.bookmarks) {
            return (
                <div>
                    {this.displayList()}
                    <AddBookmark category={this.props.category}/>
                </div>
            );
        } else {
            return <div><p>Loading...</p></div>
        }
    }
}


function mapStateToProps(state) {
    return {
        appFolder: state.userInfo.folder,
        fileId: state.userInfo.appFile,
        token: state.userInfo.token,
        file: state.markyfile,
        bookmarks: state.markyfile.bookmarks,
    };
}

export default connect(mapStateToProps, {removeBookmark})(BookmarkList);


