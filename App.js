import 'react-native-gesture-handler';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Search from './components/Search';
import FavoriteFilms from './components/FavoriteFilms';
import DetailsFilm from './components/DetailsFilm';
import {Provider} from 'react-redux';
import Store from './Store/configureStore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Test from './components/Test';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/es/integration/react';
import NewFilms from './components/NewFilms';
import FilmsSeen from './components/FilmsSeen';

export default class App extends React.Component {
  SearchStackScreen() {
    return (
      <SearchStack.Navigator>
        <SearchStack.Screen
          name="Search"
          component={Search}
          options={{title: 'Recherche'}}></SearchStack.Screen>
        <SearchStack.Screen
          name="Details"
          component={DetailsFilm}
          options={{title: 'Détails'}}></SearchStack.Screen>
      </SearchStack.Navigator>
    );
  }

  FavoriteStackScreen() {
    return (
      <FavoriteStack.Navigator>
        <FavoriteStack.Screen
          name="Favorites"
          component={FavoriteFilms}
          options={{title: 'Films favoris'}}></FavoriteStack.Screen>
      </FavoriteStack.Navigator>
    );
  }

  NewsStackScreen() {
    return (
      <NewsStack.Navigator>
        <NewsStack.Screen
          name="NewFilms"
          component={NewFilms}
          options={{title: 'Derniers films'}}></NewsStack.Screen>
        <NewsStack.Screen
          name="Details"
          component={DetailsFilm}
          options={{title: 'Détails'}}></NewsStack.Screen>
      </NewsStack.Navigator>
    );
  }

  FilmsSeenStackScreen() {
    return (
      <FilmsSeenStack.Navigator>
        <FilmsSeenStack.Screen
          name="SeenFilms"
          component={FilmsSeen}
          options={{title: 'Films vus'}}></FilmsSeenStack.Screen>
        <FilmsSeenStack.Screen
          name="Details"
          component={DetailsFilm}
          options={{title: 'Détails'}}></FilmsSeenStack.Screen>
      </FilmsSeenStack.Navigator>
    );
  }

  render() {
    let persistor = persistStore(Store);
    return (
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                  let iconName;

                  if (route.name === 'Search') {
                    iconName = focused ? 'ios-search' : 'ios-search-outline';
                  } else if (route.name === 'Favorites') {
                    iconName = focused ? 'ios-heart' : 'ios-heart-outline';
                  } else if (route.name === 'NewFilms') {
                    iconName = require('./Images/ic_fiber_new.png');
                    return (
                      <Image
                        style={styles.tabBar_icon}
                        source={iconName}></Image>
                    );
                  } else if (route.name === 'FilmsSeen') {
                    iconName = focused
                      ? 'ios-checkmark-circle'
                      : 'ios-checkmark-circle-outline';
                  }

                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: '#5AAAFF',
                inactiveTintColor: 'gray',
              }}>
              <Tab.Screen
                name="Search"
                component={this.SearchStackScreen}
                options={{tabBarLabel: 'Recherche'}}></Tab.Screen>
              <Tab.Screen
                name="Favorites"
                component={this.FavoriteStackScreen}
                options={{tabBarLabel: 'Favoris'}}></Tab.Screen>
              <Tab.Screen
                name="NewFilms"
                component={this.NewsStackScreen}
                options={{tabBarLabel: 'News'}}></Tab.Screen>
              <Tab.Screen
                name="FilmsSeen"
                component={this.FilmsSeenStackScreen}
                options={{tabBarLabel: 'Vus'}}></Tab.Screen>
            </Tab.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  tabBar_icon: {
    height: 30,
    width: 30,
  },
});

const SearchStack = createStackNavigator();
const FavoriteStack = createStackNavigator();
const NewsStack = createStackNavigator();
const FilmsSeenStack = createStackNavigator();
const Tab = createBottomTabNavigator();
