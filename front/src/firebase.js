import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyB86FXbQAMdCMk8IZqtRj1H5DS0QuZxTAU",
    authDomain: "dokushokai.firebaseapp.com",
    databaseURL: "https://dokushokai.firebaseio.com",
    projectId: "dokushokai",
    storageBucket: "dokushokai.appspot.com",
    messagingSenderId: "82642303082"
};

firebase.initializeApp(config)

export default firebase
