import firebase from 'firebase'
//import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBqeJnN3IQdiOSLaZ3Vbgdn3dDniPvqwjs",
    authDomain: "crudautenticacion.firebaseapp.com",
    databaseURL: "https://crudautenticacion.firebaseio.com",
    projectId: "crudautenticacion",
    storageBucket: "crudautenticacion.appspot.com",
    messagingSenderId: "525866673441",
    appId: "1:525866673441:web:cb2dda10e5099b45d14a60"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

export default firebaseApp.firestore();