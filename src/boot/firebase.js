// import something here
import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import VueFirestore from 'vue-firestore'

Vue.use(VueFirestore)
// "async" is optional
export default async ({
  Vue
}) => {
  // something to do
  const firebaseConfig = {
    apiKey: 'AIzaSyAE0GGIROkB6AyqpnSsD43teYKas-hrEAk',
    authDomain: 'tolis-lapper.firebaseapp.com',
    databaseURL: 'https://tolis-lapper.firebaseio.com',
    projectId: 'tolis-lapper',
    storageBucket: 'tolis-lapper.appspot.com',
    messagingSenderId: '609741278270',
    appId: '1:609741278270:web:296f89528721e5a889956f',
    measurementId: 'G-DRZ8PEE8C8'
  }

  firebase.initializeApp(firebaseConfig)
  // firebase.analytics()
  // var db = firebase.firestore()
  Vue.prototype.$firebase = firebase
}
