export const AUTH_OBJ = {
    client_id: 'GOOGLE CLIENT ID HERE',
    cookiepolicy: 'single_host_origin',
    immediate: true,
    scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.metadata.readonly'
}

export const initialUser = {
        name: null,
        email: null,
        avatar: null,
        id: null,
        token: null,
        folder: null,
        appFile: null
};

export const initialBookmarks = {
    bookmarks: {},
    settings: {},
};

export const initialInteractions = {
    addBookmark: {
        name: '',
        url: '',
    },
    addCategory: {
        name: ''
    },
    openCat: null,
};

export const folderName = 'MarkyMarks-AppData'
export const fileName = "MarkyMarks-BookmarkFile.json"

export const initialFile = {

    //this is currently filled with junk data, can empty and should work great
        bookmarks: [
            {
                name: "React Rocks",
                url: "http://react.rocks",
                category: "REACT",
                id: "zFGcx442asd",
            },

            {
                name: "React",
                url: "http://facebook.github.io",
                category: "REACT",
                id: "kd4NdLseTn",
            },

            {
                name: "FB",
                url: "http://facebook.com",
                category: "SOCIAL",
                id: "r782LlvdatT",
            },

            {
                name: "Reddit",
                url: "http://reddit.com",
                category: "SOCIAL",
                id: "mKllO47GvB",
            },

            {
                name: "Potential",
                url: "http://potenti.al",
                category: "TEST",
                id: "5a46lPPP6c"
            }
        ],
    settings: {
        Test: "test"
    }
}

export const hiddenItemOnCategoryCreation = 'mm-initial-hidden';