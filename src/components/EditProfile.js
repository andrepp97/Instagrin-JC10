import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {Header, Button, Overlay, Input} from 'react-native-elements';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {inputUsernameChange, imageProfileChange, saveProfile} from '../actions';

class EditProfile extends Component {
  state = {isVisible: false};

  componentDidUpdate() {
    if (this.props.profileImage === '') {
      this.props.navigation.navigate('Profile', {
        onGoBack: () => this.refresh(),
      });
    }
  }

  onSelectFromGalleryPress = () => {
    ImagePicker.openPicker({
      width: 700,
      height: 700,
      cropping: true,
      mediaType: 'photo',
    }).then(image => {
      this.props.imageProfileChange(image.path);
      this.setState({isVisible: false});
    });
  };

  onOpenCameraPress = () => {
    ImagePicker.openCamera({
      width: 700,
      height: 700,
      cropping: true,
    }).then(image => {
      this.props.imageProfileChange(image.path);
      this.setState({isVisible: false});
    });
  };

  saveProfile = () => {
    if (this.props.user.photoURL !== this.props.profileImage) {
      this.props.saveProfile({
        username: this.props.username,
        profileImage: this.props.profileImage,
      });
    } else {
      this.props.saveProfile({
        username: this.props.username,
        profileImage: null,
      });
    }
  };

  render() {
    return (
      <View>
        <Header
          placement="left"
          leftComponent={{
            icon: 'clear',
            color: 'black',
            onPress: () => this.props.navigation.goBack(),
          }}
          centerComponent={{
            text: 'Edit Profile',
            style: {color: 'black', fontSize: 18, fontWeight: '700'},
          }}
          rightComponent={
            this.props.loading ? (
              <ActivityIndicator size="small" color="#4388d6" />
            ) : (
              {
                icon: 'done',
                color: '#4388d6',
                onPress: this.saveProfile,
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
        <View style={{alignItems: 'center'}}>
          <Text style={{color: 'red'}}>{this.props.error}</Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 10}}>
          <Image
            source={{uri: this.props.profileImage}}
            style={{width: 90, height: 90, borderRadius: 90}}
          />
          <TouchableWithoutFeedback
            onPress={() => this.setState({isVisible: true})}>
            <Text style={{color: '#4388d6', fontSize: 17, paddingTop: 10}}>
              Change Profile Photo
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={{paddingTop: 15}}>
          <Text
            style={{
              paddingLeft: 12,
              opacity: 0.3,
            }}>
            Username
          </Text>
          <Input
            placeholder="Username"
            value={this.props.username}
            onChangeText={this.props.inputUsernameChange}
          />
        </View>
        <Overlay
          isVisible={this.state.isVisible}
          height={'auto'}
          onBackdropPress={() => this.setState({isVisible: false})}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '800',
              paddingBottom: 10,
              borderBottomColor: '#cfcfcf',
              borderBottomWidth: 1,
            }}>
            Change Profile Photo
          </Text>
          <TouchableWithoutFeedback onPress={this.onSelectFromGalleryPress}>
            <Text
              style={{
                fontSize: 16,
                paddingVertical: 15,
              }}>
              Select from Gallery
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.onOpenCameraPress}>
            <Text
              style={{
                fontSize: 16,
                paddingVertical: 15,
              }}>
              Open Camera
            </Text>
          </TouchableWithoutFeedback>
        </Overlay>
      </View>
    );
  }
}

const mapStateToProps = ({auth, editProfile}) => {
  return {
    user: auth.user,
    ...editProfile,
  };
};

export default connect(
  mapStateToProps,
  {
    inputUsernameChange,
    imageProfileChange,
    saveProfile,
  },
)(EditProfile);
