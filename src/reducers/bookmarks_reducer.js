import * as constants from '../constants/AppConstants';
import * as types from '../constants/ActionTypes';

export function markyfile(state = constants.initialBookmarks, action) {
    switch (action.type) {

        case types.SETUP_BOOKMARKS:
            return Object.assign({}, state, action.payload);

        case types.RESET_MARKY_FILE:
            return Object.assign({}, state, action.payload);

        case types.ADD_BOOKMARK_TO_STATE:
            let newItem = {
                name: action.payload.name,
                url: action.payload.url,
                category: action.payload.category,
                id: action.payload.id
            }
            return Object.assign({}, state, { bookmarks: [ ...state.bookmarks, newItem ] })


        case types.ADD_CATEGORY_TO_STATE:

            /*We display categories by iterating through our array and then displaying
             all the different categories that exists as keys. So we create an otherwise empty object
             so we can then enter that category. We will replace this empty bookmark when a first one
            is created */
            
            let newCat = {
                name: constants.hiddenItemOnCategoryCreation,
                url: constants.hiddenItemOnCategoryCreation,
                category: action.payload.category,
                id: action.payload.id
            }
            return Object.assign({}, state, { bookmarks: [ ...state.bookmarks, newCat ] })

        default:
            return state
    }
}
