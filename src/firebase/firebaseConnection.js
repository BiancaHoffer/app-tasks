import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
  apiKey: "AIzaSyAbuqaE54wteDTdCjNvThDBsZiWFCv1fhE",
  authDomain: "apptarefas-e9504.firebaseapp.com",
  databaseURL: "https://apptarefas-e9504-default-rtdb.firebaseio.com",
  projectId: "apptarefas-e9504",
  storageBucket: "apptarefas-e9504.appspot.com",
  messagingSenderId: "345571656916",
  appId: "1:345571656916:web:bcfaabc8fd8425b7b92741",
  measurementId: "G-HCBW7XT379"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

export default firebase;