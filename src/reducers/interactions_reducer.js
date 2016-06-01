import * as constants from '../constants/AppConstants';
import * as types from '../constants/ActionTypes';

export function interactions(state = constants.initialInteractions, action) {
    switch (action.type) {

        case types.INPUTTING_BOOKMARK_NAME:
            return Object.assign({}, state, { addBookmark: { url: state.addBookmark.url, name: action.payload } });

        case types.INPUTTING_BOOKMARK_URL:
            return Object.assign({}, state, { addBookmark: { url: action.payload, name: state.addBookmark.name } });

        case types.INPUTTING_CATEGORY_NAME:
            return Object.assign({}, state, { addCategory: { name: action.payload } });

        case types.OPEN_CATEGORY:
            return Object.assign({}, state, { openCat: action.payload});

        case types.CLEAR_CATEGORY:
            return Object.assign({}, state, { openCat: null });

        default:
            return state
    }
}
