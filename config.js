import firebase from 'firebase'

var firebaseConfig={
 apiKey: "AIzaSyCpKNmgH6Zx_QSxBdDcr0YMJXNbRBwd99k",
    authDomain: "attendance-app-918ef.firebaseapp.com",
    databaseURL: "https://attendance-app-918ef-default-rtdb.firebaseio.com",
    projectId: "attendance-app-918ef",
    storageBucket: "attendance-app-918ef.appspot.com",
    messagingSenderId: "99083084269",
    appId: "1:99083084269:web:c6e08fbad7436b5d9dc7e4"
  };
  
  firebase.initializeApp(firebaseConfig);
  export default firebase.database();