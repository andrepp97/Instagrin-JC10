import React, {Component} from 'react';
import firebase from '@firebase/app';
import '@firebase/auth';
import MainStack from './src/components/MainStack';
import {connect} from 'react-redux';
import {alreadyLogin, notLoginYet} from './src/actions';

class AppInit extends Component {
  componentDidMount() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: 'AIzaSyDTRLqS-bACzEEm0UPdWBJ9IKicRmLrjPM',
      authDomain: 'instagrin-96603.firebaseapp.com',
      databaseURL: 'https://instagrin-96603.firebaseio.com',
      projectId: 'instagrin-96603',
      storageBucket: 'instagrin-96603.appspot.com',
      messagingSenderId: '34293053583',
      appId: '1:34293053583:web:732382f02d6f88d95b58fa',
    };
    // Initialize Firebase
    //console.log('Isi Firebase Apps', firebase.apps)
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.alreadyLogin(user);
      } else {
        this.props.notLoginYet();
      }
    });
  }

  render() {
    return <MainStack />;
  }
}

export default connect(
  null,
  {notLoginYet, alreadyLogin},
)(AppInit);
