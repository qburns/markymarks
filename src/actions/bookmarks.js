import * as constants from '../constants/AppConstants';
import * as types from '../constants/ActionTypes';
import { createFile } from './driveAccess';
import { openCategory, inputtingAddName, inputtingAddURL } from './interactions';
export function setupBookmarks(bookmarks) {
    return {
        type: types.SETUP_BOOKMARKS,
        payload: bookmarks
    }
}

export function addBookmarkToState(category, name, url, id) {
    return {
        type: types.ADD_BOOKMARK_TO_STATE,
        payload: {category, name, url, id}
    }
}


//generate a random key for every bookmark so we can easily refer to it without mixing up items
export function createRandomId() {
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomid = Array.apply(null, new Array(10)).map(function () {
        return possible[Math.floor(Math.random() * possible.length)];
    }).join('');

    return randomid;
}

export function createBookmark(category,name, url) {

    return (dispatch,getState) => {

        var randomid = createRandomId();

        let state = getState();
        let emptyId;

        //When we first create a category, we fill it with a hidden empty object. This function
        // tests if that still exists for that category, and if so makes sure to remove it before we send
        // the file to be uploaded.
        let checkForEmpty = state.markyfile.bookmarks.filter(bookmark => {
            if (bookmark.name === constants.hiddenItemOnCategoryCreation && bookmark.category === category) {
                emptyId = bookmark.id;
                return true;
            }
            return false;
        });

            dispatch(addBookmarkToState(category, name, url, randomid));
            dispatch(inputtingAddURL(''));
            dispatch(inputtingAddName(''));

        if (checkForEmpty) {
            dispatch(removeBookmark(emptyId));
        }

        //Re-grab state after adding and upload it;
            state = getState();
            dispatch(createFile(state.markyfile, state.userInfo.folder, state.userInfo.token, state.userInfo.appFile, randomid));

    }
}


export function addCategory(category ) {

    var randomid = createRandomId();
    return (dispatch,getState) => {
        dispatch(addCategorytoState(category, randomid));
        const state = getState();
        dispatch(createFile(state.markyfile, state.userInfo.folder, state.userInfo.token, state.userInfo.appFile));
        dispatch(openCategory(category));
    }
}


export function addCategorytoState(category, id) {
    return {
        type: types.ADD_CATEGORY_TO_STATE,
        payload: {category, id}
    }
}

export function removeBookmark(id) {
   return (dispatch,getState) => {
        //dispatch(removeBookmarkfromState(category));
       let state = getState();
       let filteredItems = state.markyfile.bookmarks.filter(bookmarks => bookmarks.id !== id);
       let newBookmarks = Object.assign({}, state, { bookmarks: [ ...filteredItems ] });
       dispatch(setupBookmarks(newBookmarks));

       //regrab state after removing and upload the changes
       state = getState();
       dispatch(createFile(state.markyfile, state.userInfo.folder, state.userInfo.token, state.userInfo.appFile));
    }


}


export function removeCategory(category) {
    return (dispatch, getState) => {
        let state = getState();

        //find all items that AREN'T matching our removed category and return store them
        let filteredItems = state.markyfile.bookmarks.filter(bookmarks => bookmarks.category !== category);
        let newBookmarks = Object.assign({}, state, { bookmarks: [ ...filteredItems ] });
        //update the state with removed bookmarks in place
        dispatch(setupBookmarks(newBookmarks));

        //regrab state after removing and upload the changes
        state = getState();
        dispatch(createFile(state.markyfile, state.userInfo.folder, state.userInfo.token, state.userInfo.appFile));
}
}


export function removeBookmarkfromState(category,index) {
    return {
        type: types.REMOVE_BOOKMARK_FROM_STATE,
        payload: {category, index}
    }
}


