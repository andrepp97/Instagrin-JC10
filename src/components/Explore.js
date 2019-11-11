import React, {Component} from 'react';
import {View, ScrollView, Image, TouchableWithoutFeedback} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {connect} from 'react-redux';
import firebase from '@firebase/app';
import '@firebase/database';
import {Header} from 'react-native-elements';

class Explore extends Component {
  state = {
    post: [],
    search: '',
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
      if (val.caption.toLowerCase().includes(this.state.search.toLowerCase())) {
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
      }
    });
  };
  // RENDER DATA //

  render() {
    return (
      <View style={{flex: 1}}>
        <SearchBar
          placeholder="Search"
          onChangeText={text => this.setState({search: text})}
          value={this.state.search}
          containerStyle={{backgroundColor: '#fff'}}
          inputContainerStyle={{backgroundColor: '#fff'}}
          inputStyle={{color: 'black'}}
          lightTheme={true}
          searchIcon={{size: 27}}
        />
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {this.renderExplorePost()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapToStateProps = ({auth}) => {
  return {
    ...auth.user,
  };
};

export default connect(mapToStateProps)(Explore);
