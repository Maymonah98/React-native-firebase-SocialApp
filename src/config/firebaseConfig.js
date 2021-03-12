import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAYKYp-idjfgmhoAWsPKSRGPYOrsh2sFew",
  authDomain: "neighbors-99819.firebaseapp.com",
  databaseURL: "https://neighbors-99819-default-rtdb.firebaseio.com",
  projectId: "neighbors-99819",
  storageBucket: "neighbors-99819.appspot.com",
  messagingSenderId: "169591259336",
  appId: "1:169591259336:web:7fb4618a3bdcfdaf4ba5fd",
  measurementId: "G-F6L4TQL5D1",
}

const Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase