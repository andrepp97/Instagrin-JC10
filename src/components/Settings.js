import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Header, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {StackActions, NavigationActions} from 'react-navigation';
import {onUserLogout} from '../actions';

class Settings extends Component {
  componentDidUpdate() {
    if (!this.props.user) {
      // this.props.screenProps.rootStackNavigator.navigate('Login')
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Login'})],
      });
      this.props.screenProps.rootStackNavigator.dispatch(resetAction);
    }
  }

  render() {
    return (
      <View>
        <Header
          placement="left"
          centerComponent={{
            text: 'Settings',
            style: {color: 'black', fontSize: 18, fontWeight: '700'},
          }}
          leftComponent={{
            icon: 'arrow-back',
            color: 'black',
            onPress: () => this.props.navigation.goBack(),
          }}
          containerStyle={{
            backgroundColor: '#fff',
            justifyContent: 'space-around',
            elevation: 2,
            marginTop: Platform.OS === 'ios' ? 0 : -25,
          }}
        />
        <Button
          title="Log Out"
          containerStyle={{
            marginVertical: 15,
            marginHorizontal: 15,
            borderWidth: 0.5,
            borderColor: 'gray',
          }}
          buttonStyle={{borderColor: 'gray'}}
          titleStyle={{color: 'black'}}
          type="outline"
          onPress={this.props.onUserLogout}
        />
      </View>
    );
  }
}

const mapStateToProps = ({auth}) => {
  return {
    user: auth.user,
  };
};

export default connect(
  mapStateToProps,
  {onUserLogout},
)(Settings);
