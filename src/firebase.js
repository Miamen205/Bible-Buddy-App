import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyB1nrr1vaXXDLX6eITVhR8vCuTgwFUkLto",
  authDomain: "bible-buddy-5a7a5.firebaseapp.com",
  databaseURL: "https://bible-buddy-5a7a5.firebaseio.com",
  projectId: "bible-buddy-5a7a5",
  storageBucket: "bible-buddy-5a7a5.appspot.com",
  messagingSenderId: "646397143957",
  appId: "1:646397143957:web:13f0efec795b550176a49c"
};

firebase.initializeApp(firebaseConfig);
export default firebase;