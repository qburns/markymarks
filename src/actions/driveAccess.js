import * as constants from '../constants/AppConstants';
import * as types from '../constants/ActionTypes';
import {setupBookmarks} from './bookmarks';
import { clearCategory, inputtingAddName, inputtingAddURL } from './interactions';

export function loginUser() {

    //loginUser is the actioncreator. Needs to return an object with a type.

    return dispatch => {
        gapi.load('auth2', function () {
            let auth2 = gapi.auth2.init(constants.AUTH_OBJ);
                auth2.signIn().then(function () {
                    const profile = auth2.currentUser.get()
                    let obj = {
                        email: profile.getBasicProfile().getEmail(),
                        name: profile.getBasicProfile().getName(),
                        avatar: profile.getBasicProfile().getImageUrl(),
                        id: profile.getBasicProfile().getId(),
                        token: profile.hg.access_token
                        }

                    //Check if we got user, if not, let's try again
                    if (obj.id) {
                        dispatch(loginSuccess(obj));
                        //Successfully got user, let's grab App folder
                        dispatch(getFolder(obj.token));
                    } else {
                        dispatch(loginUser);
                    }
        });

        });

    }
}

export function loginSuccess(user) {
    return {
        type: types.LOGIN_SUCCESS,
        payload: user
    }
}

export function logoutUser() {
    return dispatch => {

        let auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            //Reset everything
            dispatch(logoutSuccess(constants.initialUser));
            dispatch(resetMarkyfile(constants.initialBookmarks));
            dispatch(clearCategory());
            dispatch(inputtingAddURL(''));
            dispatch(inputtingAddName(''));

        });

    }
}


export function logoutSuccess(user) {
    return {
        type: types.LOGOUT_SUCCESS,
        payload: user
    }
}


export function resetMarkyfile(bookmarks) {
    return {
        type: types.RESET_MARKY_FILE,
        payload: bookmarks
    }
}




export function getFolder(token) {

    return dispatch => {

        gapi.client.load('drive', 'v3', function() {
        var request = gapi.client.drive.files.list({
            'maxResults': 10
        });

        request.execute(function (resp) {
            var folderList = resp.files;
            var name = constants.folderName;
            var obj = folderList.filter(function (obj) {
                return obj.name === name;
            })[0];

            //MarkyMarks Folder Found
            if (obj) {
                let folder = obj.id
                dispatch(haveFolder(folder));

                //Now check if app file exists
                //If not, we'll create it
                dispatch(searchFile(folder, token));

            } else {
                dispatch(createFolder(token));
            }
        });


    });
        
    }

}


export function searchFile(appFolder, token) {

    return dispatch => {

        var initialRequest = gapi.client.drive.files.list({
            q: "name='"+constants.fileName+"'"
        });

        initialRequest.execute(function(resp) {
            let grabID = resp.files.length;

            if (grabID) {
                //file exists, pass ID to payload

                if (resp.files[0].id)
                dispatch(haveFile(resp.files[0].id));

                //now let's grab the content of the file
                dispatch(fileContents(resp.files[0].id, token));

            } else {
                //file does not exist, create it
                dispatch(createFile(constants.initialFile, appFolder, token));
            }
        });

    }

}

export function createFile(appData,appFolder,token, fileId = null, addingSpecific = null) {

    return dispatch => {


        if (fileId == null) {

            //file doesn't exist, let's create it.
            var content = new Blob([JSON.stringify(appData)], {"type": "application/json"});
            var uploader = new MediaUploader({
                file: content,
                token: token,
                metadata: {
                    title: constants.fileName,
                    mimeType: "application,json",
                    parents: [{
                        "kind": "drive#file",
                        "id": appFolder
                    }]
                },
                onComplete: function (data) {
                    let grabData = JSON.parse(data);

                    //store the file id in redux
                    dispatch(haveFile(grabData.id));

                    //now let's grab the content of the file
                    dispatch(fileContents(grabData.id, token));
                },
                onError: function (data) {
                    console.log(data)
                }
            });
        } else {
            //file exists, we're updating it
            var content = new Blob([JSON.stringify(appData)], {"type": "application/json"});
            var uploader = new MediaUploader({
                file: content,
                fileId: fileId,
                token: token,
                metadata: {
                    title: constants.fileName,
                    mimeType: "application,json",
                    parents: [{
                        "kind": "drive#file",
                        "id": appFolder
                    }]
                },
                onComplete: function (data) {
                    let grabData = JSON.parse(data);
                },
                onError: function (data) {
                    alert('uploading error');
                    //need to figure out how to best handle these errors here.
                }
            });
        }

        uploader.upload();

    }
}

export function haveFile(file) {
    return {
        type: types.HAVE_FILE,
        payload: file
    }
}


export function fileContents(file, token) {

    return dispatch => {

        gapi.client.request({
            'path': '/drive/v2/files/'+file,
            'method': 'GET',
            callback: function (resp) {
                var myXHR   = new XMLHttpRequest();
                myXHR.open('GET', resp.downloadUrl, true );
                myXHR.setRequestHeader('Authorization', 'Bearer ' + token );
                myXHR.onreadystatechange = () => {
                    if (myXHR.readyState == 4) {
//          1=connection ok but unsent, 2=Request received, 3=running, 4=done
                        if ( myXHR.status == 200 ) {

                            console.log(JSON.parse(myXHR.response));
                            dispatch(setupBookmarks(JSON.parse(myXHR.response)));
                        } else {
                            alert('did not get file correctly');
                        }
                    }
                }
                myXHR.send();
            }
        });

    }
}

export function haveFolder(folder) {
    return {
        type: types.HAVE_FOLDER,
        payload: folder
    }
}


export function createFolder(token) {


    return dispatch => {

        const access_token = token;

        let request = gapi.client.request({
            'path': '/drive/v3/files/',
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token,
            },
            'body':{
                "name" : constants.folderName,
                "mimeType" : "application/vnd.google-apps.folder",
            }
        });
        request.execute(function(resp) {
            dispatch(haveFolder(resp.id));

            //Now check if app file exists
            //If not, we'll create it
            dispatch(searchFile(resp.id, token));
        });

    }
}
