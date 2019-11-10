import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import '@firebase/storage';
import RNFetchBlob from 'react-native-fetch-blob';

import {
  INIT_EDIT_PROFILE,
  USERNAME_CHANGE,
  PROFILE_IMAGE_CHANGE,
  SAVE_PROFILE,
  EDIT_PROFILE_FAIL,
  EDIT_PROFILE_SUCCESS,
  LOGIN_USER_SUCCESS,
} from './types';

export const initEditProfile = ({username, profileImage}) => {
  return {
    type: INIT_EDIT_PROFILE,
    payload: {
      username,
      profileImage,
    },
  };
};

export const inputUsernameChange = username => {
  return {
    type: USERNAME_CHANGE,
    payload: username,
  };
};

export const imageProfileChange = photo => {
  return {
    type: PROFILE_IMAGE_CHANGE,
    payload: photo,
  };
};

export const saveProfile = ({username, profileImage}) => {
  return async dispatch => {
    dispatch({type: SAVE_PROFILE});

    const {currentUser} = firebase.auth();

    if (profileImage) {
      try {
        const image = profileImage;

        const Blob = RNFetchBlob.polyfill.Blob;
        const fs = RNFetchBlob.fs;
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;

        // var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        var nama = currentUser.displayName.toLowerCase().replace(/\s/g, '');
        var uniqid = nama + Date.now() + '.jpg';

        const imageRef = firebase
          .storage()
          .ref('users')
          .child(uniqid);
        let mime = 'image/jpg';
        var data = await fs.readFile(image, 'base64');
        var blob = await Blob.build(data, {type: `${mime};BASE64`});
        await imageRef.put(blob, {contentType: mime});
        blob.close();
        var url = await imageRef.getDownloadURL();
        await currentUser.updateProfile({
          displayName: username,
          photoURL: url,
        });
        var snapshot = await firebase
          .database()
          .ref(`/users/${currentUser.uid}`)
          .once('value');
        console.log('Snapshot Val : ', snapshot.val());
        console.log('Hasil Object Keys : ', Object.keys(snapshot.val()));
        var id = Object.keys(snapshot.val())[0];
        await firebase
          .database()
          .ref(`/users/${currentUser.uid}/${id}`)
          .set({
            displayName: username,
            photoURL: url,
          });
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: currentUser,
        });
        dispatch({
          type: EDIT_PROFILE_SUCCESS,
        });
      } catch (err) {
        dispatch({
          type: EDIT_PROFILE_FAIL,
          payload: err.message,
        });
      }
    } else {
      currentUser
        .updateProfile({
          displayName: username,
        })
        .then(() => {
          return firebase
            .database()
            .ref(`/users/${currentUser.uid}`)
            .once('value');
        })
        .then(snapshot => {
          var id = Object.keys(snapshot.val())[0];
          return firebase
            .database()
            .ref(`/users/${currentUser.uid}/${id}`)
            .set({
              displayName: username,
              photoURL: currentUser.photoURL,
            });
        })
        .then(() => {
          dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: currentUser,
          });
          dispatch({
            type: EDIT_PROFILE_SUCCESS,
          });
        })
        .catch(error => {
          dispatch({
            type: EDIT_PROFILE_FAIL,
            payload: error.message,
          });
        });
    }
  };
};
