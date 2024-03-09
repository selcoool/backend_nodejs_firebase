import dotenv from 'dotenv'

dotenv.config();

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'
import { getAuth } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";

// import { getMessaging } from "firebase/messaging/sw";
// import { onBackgroundMessage } from "firebase/messaging/sw";


// console.log('dotenv.config()', process.env.REACT_APP_API)



// console.log('DDDDDDD',process.env.REACT_APP_APIKEY)
// console.log('OOOOO',process.env.REACT_APP_AUTHDOMAIN)
// console.log('XXXX',process.env.REACT_APP_PROJECTID)
// console.log('YYYYYY',process.env.REACT_APP_STORAGEBUCKET)
// console.log('SSSSSS',process.env.REACT_APP_MESSAGINGSENDERID)
// console.log('IIIIIIIIII',process.env.REACT_APP_APPID)
// console.log('PPPPPPPP',process.env.REACT_APP_MEASUREMENTID)

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:process.env.REACT_APP_APIKEY,
  authDomain:process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId:process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId:process.env.REACT_APP_MEASUREMENTID
};
// greenstore-f6a65.firebaseapp.com
// greenstore-f6a65.firebaseapp.com
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
// console.log('db', 'sadsad')
export const storage = getStorage(app);