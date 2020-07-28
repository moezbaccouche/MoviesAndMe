import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import FilmList from './FilmList';

class FilmsSeen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <View style={styles.main_container}>
        <FilmList
          films={this.props.filmsSeen}
          navigation={this.props.navigation}
          favoriteList={false}
          filmsSeenList={true}></FilmList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    filmsSeen: state.toggleFilmsSeen.filmsSeen,
  };
};

export default connect(mapStateToProps)(FilmsSeen);
