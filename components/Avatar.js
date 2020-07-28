import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';

class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: require('../Images/ic_tag_faces.png'),
    };
  }

  _avatarClicked = () => {
    ImagePicker.showImagePicker({}, (response) => {
      if (response.didCancel) {
        console.log("L'utilisateur a annulé la prise de photo !");
      } else if (response.error) {
        console.log('Erreur : ' + response.error);
      } else {
        console.log('Photo : ' + response.uri);
        let requireSource = {uri: response.uri};

        const action = {type: 'SET_AVATAR', value: requireSource};
        this.props.dispatch(action);
      }
    });
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.image_container}
        onPress={() => this._avatarClicked()}>
        <Image style={styles.image_avatar} source={this.props.avatar}></Image>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  image_container: {
    margin: 5,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image_avatar: {
    height: 100,
    width: 100,
    borderColor: '#0069d9',
    borderRadius: 50,
    borderWidth: 2,
  },
});

const mapStateToProps = (state) => {
  return {
    avatar: state.setAvatar.avatar,
  };
};

export default connect(mapStateToProps)(Avatar);
