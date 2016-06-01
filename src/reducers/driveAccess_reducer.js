import * as constants from '../constants/AppConstants';
import * as types from '../constants/ActionTypes';

export function userInfo(state = constants.initialUser, action) {
    switch (action.type) {

        case types.LOGIN_SUCCESS:
            console.log(action.payload);

            return Object.assign({}, state, action.payload);

        case types.LOGOUT_SUCCESS:
            return Object.assign({}, state, action.payload);


        case types.HAVE_FOLDER:
            return Object.assign({}, state, {
                folder: action.payload
            });

        case types.HAVE_FILE:
            return Object.assign({}, state, {
                appFile: action.payload
            });


        default:
            return state
    }
}
