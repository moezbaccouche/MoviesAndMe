import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {getImageFromApi} from '../API/TMDBApi';
import FadeIn from '../Animations/FadeIn';
import moment from 'moment';

export default class FilmItem extends React.Component {
  // Components/FilmItem.js

  constructor(props) {
    super(props);
    this.state = {
      title: this.props.film.title,
    };
  }

  _displayIconFavorite() {
    if (this.props.isFilmFavorite) {
      const sourceImage = require('../Images/heart_ic.png');
      return <Image source={sourceImage} style={styles.favorite_image}></Image>;
    }
  }

  _displayFilmDate() {
    if (this.state.title != this.props.film.title) {
      this.setState({title: this.props.film.title});
    } else {
      this.setState({
        title:
          'Sorti le ' +
          moment(new Date(this.props.film.release_date)).format('DD/MM/yyyy'),
      });
    }
  }

  _displayFilmItem() {
    const {film, displayDetailsForFilm, isFilmSeen, filmsSeenList} = this.props;
    console.log(filmsSeenList);
    if (isFilmSeen && filmsSeenList) {
      return (
        <TouchableOpacity
          style={styles.main_container_film_seen}
          onPress={() => displayDetailsForFilm(film.id)}
          onLongPress={() => this._displayFilmDate()}>
          <Image
            style={styles.image_circle}
            source={{uri: getImageFromApi(film.poster_path)}}></Image>
          <View style={styles.title_view}>
            <Text style={styles.film_title}>{this.state.title}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.main_container}
        onPress={() => displayDetailsForFilm(film.id)}>
        <Image
          style={styles.image}
          source={{uri: getImageFromApi(film.poster_path)}}
        />
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            {this._displayIconFavorite()}
            <Text style={styles.title_text}>{film.title}</Text>
            <Text style={styles.vote_text}>{film.vote_average}</Text>
          </View>
          <View style={styles.description_container}>
            <Text style={styles.description_text} numberOfLines={6}>
              {film.overview}
            </Text>
          </View>
          <View style={styles.date_container}>
            <Text style={styles.date_text}>Sorti le {film.release_date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return <FadeIn>{this._displayFilmItem()}</FadeIn>;
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row',
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'gray',
  },
  content_container: {
    flex: 1,
    margin: 5,
  },
  header_container: {
    flex: 3,
    flexDirection: 'row',
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666',
  },
  description_container: {
    flex: 7,
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
  },
  date_container: {
    flex: 1,
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14,
  },
  favorite_image: {
    height: 32,
    width: 32,
  },
  image_circle: {
    height: 100,
    width: 100,
    backgroundColor: 'gray',
    margin: 5,
    borderRadius: 50,
  },
  main_container_film_seen: {
    height: 120,
    flexDirection: 'row',
  },
  title_view: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  film_title: {
    flexWrap: 'wrap',
  },
});
