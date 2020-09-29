import firebase from 'firebase';

const firebaseeApp =  firebase.initializeApp( {
  apiKey: "AIzaSyDNyAgSuu6TUZAsFJH-LmpbetHoaw_sU6U",
  authDomain: "amazo-is.firebaseapp.com",
  databaseURL: "https://amazo-is.firebaseio.com",
  projectId: "amazo-is",
  storageBucket: "amazo-is.appspot.com",
  messagingSenderId: "88236198268",
  appId: "1:88236198268:web:f025d6eb440d52d3a4bcf9",
  measurementId: "G-SSCZZP40KK"
});



  const db =firebaseeApp.firestore();
  const auth = firebaseeApp.auth();

  export {db, auth};