import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBsYHWjQPlNGJnU-X4U5nBnBIv5ZwJJPao",
    authDomain: "look-project-54115.firebaseapp.com",
    databaseURL: "https://look-project-54115.firebaseio.com",
    projectId: "look-project-54115",
    storageBucket: "look-project-54115.appspot.com",
    messagingSenderId: "425840712812",
    appId: "1:425840712812:web:03d6b9f0bf8b6bc8c54c49"
};
firebase.initializeApp(config);

export default firebase;