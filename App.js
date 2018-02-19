'use strict';

import { StackNavigator } from 'react-navigation';
import SearchPage from './SearchPage';
import SearchResults from './SearchResults';
import PropertyPage from './PropertyPage';

const App = StackNavigator({
  Home: { screen: SearchPage },
  Results: { screen: SearchResults },
  Property: { screen: PropertyPage },
});
export default App;
