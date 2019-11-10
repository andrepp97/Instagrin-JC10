import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  Platform,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {Header, ListItem, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {initEditProfile, selectProfilePost} from '../actions';

class Profile extends Component {
  componentDidUpdate() {
    if (this.props.postDetail) {
      this.props.navigation.navigate('PostDetail');
    }
  }

  onBtnEditProfilePress = () => {
    this.props.initEditProfile({
      username: this.props.user.displayName,
      profileImage: this.props.user.photoURL,
    });
    this.props.navigation.navigate('EditProfile');
  };

  renderListPost = () => {
    let i = 2;
    return this.props.listPost.map((val, idx) => {
      let styleOBJ = {width: '33%', marginVertical: 1};
      if (idx + 1 === i) {
        styleOBJ.marginHorizontal = '.5%';
        i += 3;
      }

      return (
        <View style={styleOBJ}>
          <TouchableWithoutFeedback
            onPress={() => this.props.selectProfilePost(val)}>
            <Image
              source={{uri: val.imageURL}}
              style={{height: 125, width: '100%', borderRadius: 2}}
            />
          </TouchableWithoutFeedback>
        </View>
      );
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          leftComponent={{
            text: this.props.user.displayName.toLowerCase().replace(/\s/g, ''),
            style: {color: 'black', fontSize: 18, fontWeight: '700'},
          }}
          leftContainerStyle={{flex: 4}}
          rightComponent={{
            icon: 'menu',
            color: 'black',
            onPress: () => this.props.navigation.toggleDrawer(),
          }}
          containerStyle={{
            backgroundColor: '#fff',
            justifyContent: 'space-around',
            marginTop: Platform.OS === 'ios' ? 0 : -25,
            borderBottomWidth: 0.5,
          }}
        />

        <ScrollView>
          <ListItem
            leftAvatar={{
              source: {uri: this.props.user.photoURL},
              size: 'large',
            }}
            title={this.props.user.displayName}
            subtitle={this.props.listPost.length + ' Posts'}
          />
          <Button
            title="Edit Profile"
            containerStyle={{
              marginVertical: 15,
              marginHorizontal: 15,
              borderWidth: 0.5,
              borderColor: 'gray',
            }}
            buttonStyle={{borderColor: 'gray'}}
            titleStyle={{color: 'black'}}
            type="outline"
            onPress={this.onBtnEditProfilePress}
          />

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {this.renderListPost()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({auth, post}) => {
  let user = auth.user ? auth.user : {uid: '', displayName: '', photoURL: ''};
  let listPost = post.postList.filter(val => {
    return user.uid === val.userId;
  });

  return {
    user,
    listPost,
    postDetail: post.selectedPostProfile,
  };
};

export default connect(
  mapStateToProps,
  {initEditProfile, selectProfilePost},
)(Profile);
