//Christian Bernhardt MTR-NR: 298354 HTWG-Konstanz 
//Imports
import firebase from 'firebase/compat/app'
import { getDatabase } from "firebase/database"
import {getStorage,ref} from "firebase/storage"

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
})

export const db = getDatabase(app)
export const storage = getStorage(app)
export function storageRef(path){ 
  const date = Date.now();
  const d = date.toString()
  return ref(path,"/"+d)
}
export default app

