import React, {Component} from 'react';
import {View, ScrollView, Image} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {Card, CardItem, Thumbnail, Text, Left, Body} from 'native-base';
import {getListPost} from '../actions';

class Home extends Component {
  componentDidMount() {
    this.props.getListPost();
  }

  renderListPost = () => {
    return this.props.listPost.map((val, index) => {
      return (
        <View style={{marginVertical: 10, marginHorizontal: 10}}>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: val.userPhoto}} />
                <Body>
                  <Text>{val.username}</Text>
                  <Text note>Instagrin User</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image
                source={{uri: val.imageURL}}
                style={{height: 350, width: null, flex: 1}}
              />
            </CardItem>
            <CardItem>
              <Left>
                <Text>{val.caption}</Text>
              </Left>
            </CardItem>
          </Card>
        </View>
      );
    });
  };

  render() {
    console.log('List Post : ', this.props.listPost);
    return (
      <View style={{flex: 1}}>
        <Header
          leftComponent={{
            text: 'Instagrin',
            style: {color: 'black', fontSize: 18, fontWeight: '700'},
          }}
          leftContainerStyle={{flex: 3}}
          containerStyle={{
            backgroundColor: '#fff',
            justifyContent: 'space-around',
            marginTop: Platform.OS === 'ios' ? 0 : -25,
            elevation: 2,
          }}
        />
        <ScrollView>{this.renderListPost()}</ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({post}) => {
  return {
    listPost: post.postList,
  };
};

export default connect(
  mapStateToProps,
  {getListPost},
)(Home);
