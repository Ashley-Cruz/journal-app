import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAFYsaKaEwJLb0A1pmcgwgQ2Fzj8B6XREI",
    authDomain: "react-app-curso-d0664.firebaseapp.com",
    projectId: "react-app-curso-d0664",
    storageBucket: "react-app-curso-d0664.appspot.com",
    messagingSenderId: "426825694509",
    appId: "1:426825694509:web:18cbdd9396383acba727a4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}