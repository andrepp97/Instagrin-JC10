import React, {Component} from 'react';
import OneSignal from 'react-native-onesignal';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';
import AppInit from './AppInit';
import reducers from './src/reducers';

class App extends Component {
  constructor(properties) {
    super(properties);
    OneSignal.init('22951ce0-3a2d-48c5-8fac-4bd8ab65bb6c');

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(reduxThunk))}>
        <AppInit />
      </Provider>
    );
  }
}

export default App;
