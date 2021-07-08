import firebase from 'firebase';
import 'firebase/storage';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBUEXTUE4flvy9hwVIlmyFGl4ErZ-DrbKI',
  authDomain: 'ec-react-typescript.firebaseapp.com',
  projectId: 'ec-react-typescript',
  storageBucket: 'ec-react-typescript.appspot.com',
  messagingSenderId: '585697143162',
  appId: '1:585697143162:web:98ba3532ff48648ad54ec3',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const providerGoogle = new firebase.auth.GoogleAuthProvider();
export const strage = firebase.storage();

export default firebase;
