import * as constants from '../constants/AppConstants';
import * as types from '../constants/ActionTypes';

export function inputtingAddName(val) {
    return {
        type: types.INPUTTING_BOOKMARK_NAME,
        payload: val
    }
}


export function inputtingAddURL(val) {
    return {
        type: types.INPUTTING_BOOKMARK_URL,
        payload: val
    }
}


export function openCategory(cat) {
    return {
        type: types.OPEN_CATEGORY,
        payload: cat
    }
}


//Considering coming back to this function to change it to dispatch a fileContents action, which would essentially
// act as a "triple check we're actually still up to date". Theoretically this shouldn't be necessary as we should
// always know the exact state based on on success/failure responses.
export function clearCategory() {
    return dispatch => {
        dispatch(clearCategoryToState());
        dispatch(inputtingAddURL(''));
        dispatch(inputtingAddName(''));
        dispatch(inputtingCategoryName(''));
    }
}


export function clearCategoryToState() {
    return {
        type: types.CLEAR_CATEGORY,
    }
}


export function inputtingCategoryName(val) {
    return {
        type: types.INPUTTING_CATEGORY_NAME,
        payload: val
    }
}