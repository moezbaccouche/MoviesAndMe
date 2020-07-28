// Components/FilmList.js

import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import FilmItem from './FilmItem';
import {connect} from 'react-redux';

class FilmList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
    };
  }

  _displayDetailsForFilm = (idFilm) => {
    console.log('Display film ' + idFilm);
    this.props.navigation.navigate('Details', {idFilm: idFilm});
  };

  render() {
    return (
      <FlatList
        style={styles.list}
        data={this.props.films}
        extraData={this.props.favoriteFilms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <FilmItem
            film={item}
            isFilmFavorite={
              this.props.favoriteFilms.findIndex(
                (film) => film.id === item.id,
              ) !== -1
                ? true
                : false
            }
            isFilmSeen={
              this.props.filmsSeen.findIndex((film) => film.id === item.id) !==
              -1
                ? true
                : false
            }
            displayDetailsForFilm={this._displayDetailsForFilm}
            filmsSeenList={this.props.filmsSeenList}
          />
        )}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (
            !this.props.favoriteList &&
            this.props.page < this.props.totalPages
          ) {
            this.props.loadFilms();
          }
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    favoriteFilms: state.toggleFavorite.favoriteFilms,
    filmsSeen: state.toggleFilmsSeen.filmsSeen,
  };
};

export default connect(mapStateToProps)(FilmList);
