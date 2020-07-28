import React from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import FilmItem from './FilmItem';
import FilmList from './FilmList';
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi';
import {connect} from 'react-redux';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.searchedText = '';
    this.page = 0;
    this.totalPages = 0;
    this.state = {
      films: [],
      isLoading: false,
    };
  }

  _loadFilms = () => {
    if (this.searchedText.length > 0) {
      this.setState({isLoading: true});
      getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(
        (data) => {
          this.page = data.page;
          this.totalPages = data.total_pages;
          this.setState({
            films: [...this.state.films, ...data.results],
            isLoading: false,
          });
        },
      );
    } else {
      alert('Champs vide');
    }
  };

  _searchFilms() {
    this.page = 0;
    this.totalPages = 0;
    this.setState(
      {
        films: [],
      },
      () => {
        this._loadFilms();
      },
    );
  }

  _searchInputTextChanged(text) {
    this.searchedText = text;
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator color="#CF000A" size="large"></ActivityIndicator>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TextInput
          onChangeText={(text) => this._searchInputTextChanged(text)}
          onSubmitEditing={() => this._searchFilms()}
          placeholder="Titre du film"
          style={styles.textInput}></TextInput>
        <Button title="Rechercher" onPress={() => this._searchFilms()}></Button>
        <FilmList
          films={this.state.films}
          navigation={this.props.navigation}
          loadFilms={this._loadFilms}
          page={this.page}
          totalPages={this.totalPages}
          favoriteList={false}
          filmsSeenList={false}
        />
        {this._displayLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  textInput: {
    borderColor: '#000000',
    borderWidth: 1,
    marginLeft: 5,
    marginEnd: 5,
    marginBottom: 5,
    marginTop: 5,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    favoriteFilms: state.toggleFavorite.favoriteFilms,
  };
};

export default connect(mapStateToProps)(Search);
