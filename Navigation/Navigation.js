import {createStackNavigator, createAppContainer} from 'react-navigation-stack';
import Search from '../components/Search';

const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Rechercher',
    },
  },
});

export default createAppContainer(SearchStackNavigator);
