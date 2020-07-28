import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  Button,
  TouchableOpacity,
  Share,
  Platform,
} from 'react-native';
import {getFilmDetailsFromApi, getImageFromApi} from '../API/TMDBApi';
import moment from 'moment';
import numeral from 'numeral';
import {connect} from 'react-redux';
import EnlargeShrink from '../Animations/EnlargeShrink';

class DetailsFilm extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    if (params.film != undefined && Platform.OS === 'ios') {
      return {
        headerRight: (
          <TouchableOpacity
            style={share_touchable_headerRightButton}
            onPress={() => params.shareFilm()}>
            <Image
              style={share_image}
              source={require('../Images/ic_share.png')}></Image>
          </TouchableOpacity>
        ),
      };
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      film: undefined,
      isLoading: true,
    };
  }

  componentDidMount() {
    const favoriteFilmIndex = this.props.favoriteFilms.findIndex(
      (item) => item.id === this.props.route.params.idFilm,
    );
    if (favoriteFilmIndex !== -1) {
      this.setState(
        {
          film: this.props.favoriteFilms[favoriteFilmIndex],
          isLoading: false,
        },
        () => {
          this._updateNavigationParams();
        },
      );
      return;
    }

    this.setState({isLoading: true});
    getFilmDetailsFromApi(this.props.route.params.idFilm).then((data) => {
      this.setState(
        {
          film: data,
          isLoading: false,
        },
        () => {
          this._updateNavigationParams();
        },
      );
    });
  }

  componentDidUpdate() {}

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator color="#CF000A" size="large"></ActivityIndicator>
        </View>
      );
    }
  }

  _toggleFavorite() {
    const action = {
      type: 'TOGGLE_FAVORITE',
      value: this.state.film,
    };
    this.props.dispatch(action);
  }

  _toggleFilmSeen() {
    const action = {
      type: 'TOGGLE_SEEN',
      value: this.state.film,
    };
    this.props.dispatch(action);
  }

  _displayImage() {
    let sourceImage = require('../Images/empty_heart_ic.png');
    let shouldEnlarge = false;
    const filmIndex = this.props.favoriteFilms.findIndex(
      (item) => item.id === this.state.film.id,
    );
    if (filmIndex !== -1) {
      sourceImage = require('../Images/heart_ic.png');
      shouldEnlarge = true;
    }

    return (
      <EnlargeShrink shouldEnlarge={shouldEnlarge}>
        <Image style={styles.favorite_image} source={sourceImage}></Image>
      </EnlargeShrink>
    );
  }

  _shareFilm = () => {
    const {film} = this.state;
    Share.share({title: film.title, message: film.overview});
  };

  _updateNavigationParams() {
    this.props.navigation.setParams({
      shareFilm: this._shareFilm,
      film: this.state.film,
    });
  }

  _displayFloatingActionButton() {
    const {film} = this.state;
    if (film != undefined && Platform.OS === 'android') {
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingActionButton}
          onPress={() => this._shareFilm()}>
          <Image
            style={styles.share_image}
            source={require('../Images/ic_share.png')}></Image>
        </TouchableOpacity>
      );
    }
  }

  _displaySeenFilmButton() {
    let filmSeen = 'Marquer comme vu';
    console.log(this.props.filmsSeen);
    const filmIndex = this.props.filmsSeen.findIndex(
      (item) => item.id === this.state.film.id,
    );
    if (filmIndex !== -1) {
      filmSeen = 'Non vu';
    }
    return (
      <Button title={filmSeen} onPress={() => this._toggleFilmSeen()}></Button>
    );
  }

  _displayFilm() {
    const {film} = this.state;
    if (film != undefined) {
      return (
        <ScrollView style={styles.scrollView_container}>
          <Image
            style={styles.film_image}
            source={{
              uri: getImageFromApi(film.poster_path),
            }}></Image>

          <View style={styles.title_view}>
            <Text style={styles.title_text}>{film.title}</Text>
          </View>

          <TouchableOpacity
            style={styles.favorite_container}
            onPress={() => this._toggleFavorite()}>
            {this._displayImage()}
          </TouchableOpacity>
          <View style={styles.description_view}>
            <Text style={styles.overview_text}>{film.overview}</Text>
          </View>
          <View style={styles.info_view}>
            <Text style={styles.info_text}>
              <Text style={styles.info_subtitles}>Sorti le: </Text>
              {moment(new Date(film.release_date)).format('DD/MM/YYYY')}
            </Text>
            <Text style={styles.info_text}>
              <Text style={styles.info_subtitles}>Note: </Text>
              {film.vote_average}
            </Text>
            <Text style={styles.info_text}>
              <Text style={styles.info_subtitles}>Nombre de votes: </Text>
              {film.vote_count}
            </Text>
            <Text style={styles.info_text}>
              <Text style={styles.info_subtitles}>Budget: </Text>
              {numeral(film.budget).format('0,0[.]00 $')}
            </Text>
            <Text style={styles.info_text}>
              <Text style={styles.info_subtitles}>Genre(s): </Text>
              {film.genres.map((genre) => genre.name).join('/')}
            </Text>
            <Text style={styles.info_text}>
              <Text style={styles.info_subtitles}>Companie(s): </Text>
              {film.production_companies
                .map((company) => company.name)
                .join('/')}
            </Text>

            {this._displaySeenFilmButton()}
          </View>
        </ScrollView>
      );
    }
  }

  render() {
    const idFilm = this.props.route.params.idFilm;
    const film = this.state.film;
    return (
      <View style={styles.main_container}>
        {this._displayFilm()}
        {this._displayLoading()}
        {this._displayFloatingActionButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    margin: 5,
  },
  scrollView_container: {
    flex: 1,
  },
  film_image: {
    height: 200,
  },
  title_view: {
    flex: 1,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  title_text: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  description_view: {
    flex: 3,
    margin: 5,
  },
  overview_text: {
    fontSize: 16,
  },
  info_view: {
    marginTop: 20,
    margin: 5,
  },
  info_subtitles: {
    fontWeight: 'bold',
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info_text: {
    fontSize: 16,
  },
  favorite_container: {
    alignItems: 'center',
  },
  favorite_image: {
    flex: 1,
    width: null,
    height: null,
  },
  share_touchable_floatingActionButton: {
    position: 'absolute',
    height: 60,
    width: 60,
    bottom: 30,
    right: 30,
    borderRadius: 30,
    backgroundColor: '#0069d9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  share_image: {
    height: 30,
    width: 30,
  },
  share_touchable_headerRightButton: {
    marginRight: 8,
  },
});

const mapStateToProps = (state) => {
  return {
    favoriteFilms: state.toggleFavorite.favoriteFilms,
    filmsSeen: state.toggleFilmsSeen.filmsSeen,
  };
};

export default connect(mapStateToProps)(DetailsFilm);
