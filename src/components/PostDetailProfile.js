import React, {Component} from 'react';
import {
  Image,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {Header, Icon, Input, Overlay} from 'react-native-elements';
import {connect} from 'react-redux';
import {
  Card,
  CardItem,
  Text,
  Thumbnail,
  Button,
  Left,
  Body,
  Right,
} from 'native-base';
import {selectProfilePost, deletePost} from '../actions';
import firebase from '@firebase/app';
import '@firebase/database';

class PostDetailProfile extends Component {
  state = {
    isVisible: false,
    deleteVisible: false,
    editPost: false,
    editCaption: '',
    isLoading: false,
  };

  // LIFECYCLE //
  componentDidUpdate() {
    if (!this.props.username) {
      this.props.navigation.goBack();
    }
  }
  componentWillUnmount() {
    this.props.selectProfilePost(null);
  }
  // LIFECYCLE //

  // USER ACTIONS //
  onUserEditPost = () => {
    this.setState({
      editPost: true,
      editCaption: this.props.caption,
      isVisible: false,
    });
  };

  saveEditedPost = () => {
    this.setState({isLoading: true});
    try {
      firebase
        .database()
        .ref(`posts/${this.props.id}`)
        .update({
          caption: this.state.editCaption,
        })
        .then(() => {
          // this.props.selectProfilePost(null);
          this.setState({isLoading: false, editPost: false});
          ToastAndroid.show(
            'Post Edited Successfully!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        });
    } catch (e) {
      console.log(e);
    }
  };

  onDeletePress = () => {
    this.setState({deleteVisible: false});
    this.props.deletePost(this.props.id);
  };
  // USER ACTIONS //

  render() {
    if (!this.props.username) {
      return <View />;
    }

    return (
      <View>
        <Header
          placement="left"
          centerComponent={{
            text: 'Post',
            style: {color: 'black', fontSize: 18, fontWeight: '700'},
          }}
          leftComponent={{
            icon: 'arrow-back',
            color: 'black',
            onPress: () => this.props.selectProfilePost(null),
          }}
          rightComponent={
            this.state.editPost ? (
              !this.state.isLoading ? (
                {
                  icon: 'done',
                  color: '#4388d6',
                  onPress: this.saveEditedPost,
                }
              ) : (
                <ActivityIndicator size="small" color="#4388d6" />
              )
            ) : null
          }
          containerStyle={{
            backgroundColor: '#fff',
            justifyContent: 'space-around',
            elevation: 2,
            // eslint-disable-next-line no-undef
            marginTop: Platform.OS === 'ios' ? 0 : -25,
          }}
        />
        <ScrollView style={{marginBottom: 60}}>
          <Card>
            <CardItem>
              <Left style={{flex: 4}}>
                <Thumbnail source={{uri: this.props.userPhoto}} />
                <Body>
                  <Text>{this.props.username}</Text>
                  <Text note>Instagrin User</Text>
                </Body>
              </Left>
              <Right>
                <Icon
                  name="more-vert"
                  size={30}
                  onPress={() => this.setState({isVisible: true})}
                />
              </Right>
            </CardItem>
            <CardItem cardBody>
              <Image
                source={{uri: this.props.imageURL}}
                style={{height: 350, width: null, flex: 1}}
              />
            </CardItem>
            <CardItem>
              <Left>
                {this.state.editPost ? (
                  <Input
                    autoFocus={true}
                    selectTextOnFocus={true}
                    placeholder="Caption"
                    value={this.state.editCaption}
                    onChangeText={text => this.setState({editCaption: text})}
                  />
                ) : (
                  <Text>{this.props.caption}</Text>
                )}
              </Left>
            </CardItem>
          </Card>
        </ScrollView>

        {/* POST MENU MODAL */}
        <Overlay
          isVisible={this.state.isVisible}
          height={'auto'}
          onBackdropPress={() => this.setState({isVisible: false})}>
          <TouchableWithoutFeedback onPress={this.onUserEditPost}>
            <Text
              style={{
                fontSize: 16,
                paddingVertical: 15,
              }}>
              Edit
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() =>
              this.setState({isVisible: false, deleteVisible: true})
            }>
            <Text
              style={{
                fontSize: 16,
                paddingVertical: 15,
              }}>
              Delete
            </Text>
          </TouchableWithoutFeedback>
        </Overlay>

        {/* DELETE MODAL */}
        <Overlay isVisible={this.state.deleteVisible} height={'auto'}>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                alignItems: 'center',
                height: 90,
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 18, paddingBottom: 5}}>
                Confirm Deletion
              </Text>
              <Text note>Delete this post ?</Text>
            </View>
            <TouchableWithoutFeedback onPress={this.onDeletePress}>
              <View
                style={{
                  paddingVertical: 15,
                  borderTopWidth: 0.3,
                  borderTopColor: '#dedede',
                  width: '100%',
                  alignItems: 'center',
                }}>
                <Text
                  style={{fontSize: 15, color: '#4388d6', fontWeight: 'bold'}}>
                  Delete
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => this.setState({deleteVisible: false})}>
              <View
                style={{
                  paddingVertical: 15,
                  borderTopWidth: 0.3,
                  borderTopColor: '#dedede',
                  width: '100%',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 16}}>Don't Delete</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Overlay>

        {/* DELETING MODAL */}
        <Overlay
          isVisible={this.props.deleteLoading}
          height={'auto'}
          width={'auto'}
          onBackdropPress={() => this.setState({isVisible: false})}>
          <View style={{padding: 15}}>
            <Text style={{fontSize: 15}}>Deleting . . .</Text>
          </View>
        </Overlay>
      </View>
    );
  }
}

const mapStateToProps = ({post}) => {
  return {
    ...post.selectedPostProfile,
    deleteLoading: post.deleteLoading,
  };
};

export default connect(
  mapStateToProps,
  {selectProfilePost, deletePost},
)(PostDetailProfile);
