import React, {Component} from 'react';
import {View, ScrollView, Image, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import firebase from '@firebase/app';
import '@firebase/database';

class Explore extends Component {
  state = {
    post: [],
  };

  // LIFECYCLE //
  componentDidMount() {
    this.getExplorePost();
  }
  // LIFECYCLE //

  // GET DATA //
  getExplorePost = () => {
    firebase
      .database()
      .ref('/posts')
      .once('value')
      .then(post => {
        let arrData = [];
        Object.keys(post.val()).forEach(data => {
          const currentData = post.val()[data];
          if (currentData.userId !== this.props.uid) {
            arrData.push(currentData);
          }
        });
        this.setState({
          post: arrData,
        });
        console.log(arrData);
      });
  };
  // GET DATA //

  // RENDER DATA //
  renderExplorePost = () => {
    let i = 2;
    return this.state.post.map((val, idx) => {
      let styleOBJ = {width: '33%', marginVertical: 1};
      if (idx + 1 === i) {
        styleOBJ.marginHorizontal = '.5%';
        i += 3;
      }

      return (
        <View style={styleOBJ}>
          <TouchableWithoutFeedback
            onPress={() =>
              this.props.navigation.navigate('ExploreDetail', val)
            }>
            <Image
              source={{uri: val.imageURL}}
              style={{height: 125, width: '100%', borderRadius: 2}}
            />
          </TouchableWithoutFeedback>
        </View>
      );
    });
  };
  // RENDER DATA //

  render() {
    return (
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {this.renderExplorePost()}
        </View>
      </ScrollView>
    );
  }
}

const mapToStateProps = ({auth}) => {
  return {
    ...auth.user,
  };
};

export default connect(mapToStateProps)(Explore);
