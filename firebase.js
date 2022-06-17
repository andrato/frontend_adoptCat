// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABM1-k-aogDWDtGOjImfcr_ZGbZyNaGF0",
  authDomain: "catadoption-f68aa.firebaseapp.com",
  projectId: "catadoption-f68aa",
  storageBucket: "catadoption-f68aa.appspot.com",
  messagingSenderId: "920978149364",
  appId: "1:920978149364:web:9a9cc712b35970b284f3a1"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = firebase.auth();

export { auth };