import React, {Component} from 'react';
import {View, ScrollView, Image, ActivityIndicator} from 'react-native';
import {Header, Input} from 'react-native-elements';
import {Body, Card, CardItem, Left, Text, Thumbnail} from 'native-base';
import firebase from '@firebase/app';
import '@firebase/database';

class EditCaption extends Component {
  state = {
    caption: this.props.navigation.getParam('caption'),
  };

  updateCaption = () => {
    firebase
      .database()
      .ref(`posts/${this.props.navigation.getParam('id')}`)
      .update({
        caption: this.state.caption,
      })
      .then(() => {
        console.log('COBA ' + this.props.navigation.state);
        this.props.navigation.state.params.onSaveCaption();
        this.props.navigation.goBack();
      });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          placement="left"
          centerComponent={{
            text: 'Edit Post',
            style: {color: 'black', fontSize: 18, fontWeight: '700'},
          }}
          leftComponent={{
            icon: 'close',
            color: 'black',
            onPress: () => this.props.navigation.goBack(),
          }}
          rightComponent={
            this.state.isLoading ? (
              <ActivityIndicator size="small" color="#4388d6" />
            ) : (
              {
                icon: 'done',
                color: 'black',
                onPress: () => this.updateCaption(),
              }
            )
          }
          containerStyle={{
            backgroundColor: '#fff',
            justifyContent: 'space-around',
            elevation: 2,
            marginTop: Platform.OS === 'ios' ? 0 : -25,
          }}
        />

        <ScrollView>
          <Card>
            <CardItem>
              <Left style={{flex: 3}}>
                <Thumbnail
                  source={{uri: this.props.navigation.getParam('userPhoto')}}
                />
                <Body>
                  <Text>{this.props.navigation.getParam('username')}</Text>
                  <Text note>Instagrin User</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image
                source={{uri: this.props.navigation.getParam('imageURL')}}
                style={{height: 350, width: null, flex: 1}}
              />
            </CardItem>
            <CardItem>
              <Left>
                <Input
                  value={this.state.caption}
                  onChange={event =>
                    this.setState({caption: event.nativeEvent.text})
                  }
                />
              </Left>
            </CardItem>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

export default EditCaption;
