import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyARhxitu3ezI8QqK-OWeQDSwbWRoX9jtVA",
  authDomain: "flashcards-bd2ac.firebaseapp.com",
  databaseURL: "https://flashcards-bd2ac.firebaseio.com",
  projectId: "flashcards-bd2ac",
  storageBucket: "flashcards-bd2ac.appspot.com",
  messagingSenderId: "490719504307"
};
firebase.initializeApp(config);

export default firebase 