// Your web app's Firebase configuration
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig  = firebase.initializeApp({
	apiKey: "AIzaSyBlsFtIpxODXNuf7-5t6UMnTu0Ept9fa4c",
	authDomain: "guestbook-f09b1.firebaseapp.com",
	databaseURL: "https://guestbook-f09b1.firebaseio.com",
	projectId: "guestbook-f09b1",
	storageBucket: "guestbook-f09b1.appspot.com",
	messagingSenderId: "307351416275",
	appId: "1:307351416275:web:26288f6a5ff507db0d9326"
});
// Initialize Firebase

// const db = firebase.firestore();
// const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// export { db, googleAuthProvider, firebase };
export const auth = firebaseConfig.auth()
export const db = firebaseConfig.firestore()
export default firebaseConfig
