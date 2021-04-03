// Get a RTDB instance
import firebase from 'firebase/app'
import 'firebase/database'

export const db = firebase
  .initializeApp({ databaseURL: 'https://appvuejsfirebase-c06fb-default-rtdb.firebaseio.com/' })
  .database()